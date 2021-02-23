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
    const name = this.route.snapshot.params.name;
    if (this.pokemonService.pokemons.length) {
      this.pokemon = this.pokemonService.pokemons.find(i => i.name === name);
      console.log(this.pokemon);
    } else {
      this.pokemonService.get(name).subscribe(response => {
        this.pokemon = response;
        console.log(this.pokemon);
      }, error => console.log('Error Occurred:', error));
    }
  }

  getType(pokemon: any): string {
    return this.pokemonService.getType(pokemon);
  }

}
