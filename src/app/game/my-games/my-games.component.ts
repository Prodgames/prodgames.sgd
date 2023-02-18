import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GameService } from '../game.service';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.css']
})
export class MyGamesComponent implements OnInit {

  clientgames: any[];

  constructor(private readonly _gameService: GameService) { }

  ngOnInit(): void {
    this.getClientGames();
  }

  share(group){
    var context = this;
    navigator.clipboard.writeText("Link copiado").then( function() {
      Toast.fire({
        icon: 'success',
        title: 'Link copiado, compartelo con tus jugadores !'
      })
    }, function(err) {
      console.error('No se pudo copiar el texto ', err);
    });
  }

  getClientGames() {
    const myIdClient = sessionStorage.getItem("id");
		this._gameService.getClientGames(myIdClient).subscribe(
			async (data) => {
				console.log(data);
        if(data.success){

          const arrayGrouped = this.groupBy(data.data, "cg_id");
          this.clientgames = arrayGrouped;
          console.log(arrayGrouped);
        }
			},
			(err) => {
				if (err.status === 401 || err.status === 403) {
				}
				console.log(err);
			}
		);
	}

  groupBy(collection, property) {
    var i = 0, val, index,
        values = [], result = [];
    for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(val);
        if (index > -1)
            result[index].push(collection[i]);
        else {
            values.push(val);
            result.push([collection[i]]);
        }
    }
    return result;
}

}
