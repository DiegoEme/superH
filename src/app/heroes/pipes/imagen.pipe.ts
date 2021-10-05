import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'imagen',
  pure: false //para que automaticamente se actuialice la nueva imagen en la ui (sin f5) que se agrega al heroe al editar o crear
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {  
    console.log("pipe imagen se proceso") 
    if(!heroe.id && !heroe.alt_img){
      return 'assets/no.jpg'
    } else if (heroe.alt_img){
      return heroe.alt_img
    }
    return `assets/${heroe.id}.jpg`;
  }

}
