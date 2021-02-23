import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  pokemon: any = null;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const name = params.name;
      if (this.pokemonService.pokemons.length) {
        this.pokemon = this.pokemonService.pokemons.find(i => i.name === name);
        this.getEvolution();
      } else {
        this.pokemonService.get(name).subscribe(response => {
          this.pokemon = response;
          this.getEvolution();
        }, error => console.log('Error Occurred:', error));
      }
    });
  }

  getType(pokemon: any): string {
    return this.pokemonService.getType(pokemon);
  }

  getEvolution() {
    if (!this.pokemon.evolutions || !this.pokemon.evolutions.length) {
      this.pokemon.evolutions = [];
      this.pokemonService.getSpecies(this.pokemon.name).subscribe(response => {
        const id = this.getId(response.evolution_chain.url);
        this.pokemonService.getEvolution(id).subscribe(response => {
          this.getEvolves(response.chain);
        })
      });
    }
  }

  getEvolves(chain: any) {
    const species = {
      id: this.getId(chain.species.url),
      name: chain.species.name
    };

    this.pokemon.evolutions.push(species);

    if (chain.evolves_to.length) {
      this.getEvolves(chain.evolves_to[0]);
    }
  }

  getId(url: string): number {
    const splitUrl = url.split('/')
    return +splitUrl[splitUrl.length - 2];
  }

}
