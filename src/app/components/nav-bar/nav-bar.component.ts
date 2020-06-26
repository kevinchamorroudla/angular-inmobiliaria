import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { faHouseUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isCollapsed = true;
  faHouseUser = faHouseUser;
  faSearch = faSearch;

  constructor(public auth: AuthService,
    private router: Router,) { }

  ngOnInit() {
  }

  buscarPropiedades(textoBusqueda: string){
    this.router.navigate(['/listar-propiedades', { textoBusqueda: textoBusqueda }]);
  }

}
