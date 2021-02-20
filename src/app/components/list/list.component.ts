import { Component, OnInit } from '@angular/core';
import { concat } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  pokemons: any[] = [];
  next: string = '';

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadMore();
  }

  getType(pokemon: any): string {
    return pokemon && pokemon.types.length > 0 ? pokemon.types[0].type.name : '';
  }

  loadMore(): void {
    this.pokemonService.getNext(this.next).subscribe(response => {
      this.next = response.next;
      if (response && response.results) {
        const details = response.results.map((i: any) => this.pokemonService.get(i.name));
        concat(...details).subscribe((response: any) => {
          this.pokemons.push(response);
        });
      }
    })
  }

}
