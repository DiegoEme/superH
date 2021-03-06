import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: "DC Comics",
      desc: "DC - Comics"
    },
    {
      id: "Marvel",
      desc: "Marvel - Comics"
    }
  ]

  heroe: Heroe = {
    superhero: "",
    alter_ego: "",
    characters: "",
    publisher: Publisher.DCComics,
    alt_img: "",
    first_appearance: ""
  }

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')){
      return;
    }

    this.activatedRoute.params.
      pipe(switchMap(({id}) => this.heroesService.getHeroePorId(id))).
      subscribe((heroe) => this.heroe = heroe)
  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0) return;
    
    //Si el heroe tiene id, significa que ya ha sido creado en la base de datos
    //entonces no se debe crear uno nuevo sino actualizarlo
    if(this.heroe.id){
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe(heroe => console.log("actualizando", heroe) )
    } else {
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe(heroe => this.router.navigate(["/heroes/editar", heroe.id]))
    }
  }

  borrar(){
    this.heroesService.borrarHeroe(this.heroe.id)
    .subscribe(res => this.router.navigate(["/heroes"]))
  }

}
