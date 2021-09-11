import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from "rxjs/operators"
import { Heroe } from '../../interfaces/heroe.interface';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px
    }
  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe: Heroe; 

  constructor(private route: ActivatedRoute, 
              private heroesService: HeroesService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(({id}) => this.heroesService.getHeroePorId(id))
      )
    .subscribe(heroe => {
      this.heroe = heroe
    })
  }

  regresar(){
    this.router.navigate(["/heroes/listado"])
  }
}
