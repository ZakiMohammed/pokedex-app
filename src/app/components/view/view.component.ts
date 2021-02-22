import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params);
    console.log(this.pokemonService.pokemons);
    const id = +this.route.snapshot.params.id;
    if (id) {
      const pokemon = this.pokemonService.pokemons.find(i => i.id === id);
      console.log(pokemon);
    }
  }

}
