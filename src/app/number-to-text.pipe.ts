import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToText'
})
export class NumberToTextPipe implements PipeTransform {

  transform(value: string, ...args) {
    if(parseInt(value) == 0){
      return 'Novice';
    }else if(parseInt(value) == 20){
      return 'Novice';
    }else if(parseInt(value) == 40){
      return 'Average';
    }else if(parseInt(value) == 60){
      return 'Good';
    }else if(parseInt(value) == 80){
      return 'Expert';
    }else if(parseInt(value) == 100){
      return 'Guru';
    }
  }
}
