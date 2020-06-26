import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { PropiedadesReporte } from 'src/app/models/PropiedadesReporte';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { compareAsc, format, parse } from 'date-fns'

@Component({
  selector: 'app-reportes-propiedades',
  templateUrl: './reportes-propiedades.component.html',
  styleUrls: ['./reportes-propiedades.component.css']
})
export class ReportesPropiedadesComponent implements OnInit {

  faSearch = faSearch;
  dataSource: Array<PropiedadesReporte>;
  dataSourcePorFecha: Array<PropiedadesReporte>;

  rangoFechaForm = new FormGroup({
    fechaDesde: new FormControl(new Date(), [Validators.required]),
    fechahasta: new FormControl(new Date(), [Validators.required])
  });

  constructor(service: AppService,
    private ubicacionesService: UbicacionesService) {

    this.ubicacionesService.getCiudades().subscribe(s => {
      this.dataSource = new Array<PropiedadesReporte>()
      for (let index = 0; index < s.length; index++) {
        let item = new PropiedadesReporte();
        item.nombre_ciudad = s[index].nombre;
        item.cantidad_propiedades = s[index].propiedades.length;
        this.dataSource.push(item)
      }
      console.log(this.dataSource)
    })

  }

  ngOnInit(): void {

  }

  customizeTooltip = (info: any) => {
    return {
      html: "<div><div class='tooltip-header'>" +
        info.argumentText + "</div>" +
        "<div class='tooltip-body'><div class='series-name'>" +
        info.points[0].seriesName +
        ": </div><div class='value-text'>" +
        info.points[0].valueText +
        "</div><div class='series-name'>" +
        info.points[1].seriesName +
        ": </div><div class='value-text'>" +
        info.points[1].valueText +
        "% </div></div></div>"
    };
  }

  customizeLabelText = (info: any) => {
    return info.valueText + "%";
  }

  propiedadesAlquiladasPorFecha(fechaDesde, fechaHasta) {

    var valueFechaDesde = (fechaDesde!=null && fechaDesde!="" ? parse(fechaDesde, 'dd/MM/yyyy', new Date()) : null)
    var valueFechaHasta = (fechaHasta!=null && fechaHasta!="" ? parse(fechaHasta, 'dd/MM/yyyy', new Date()) : null)

    this.ubicacionesService.getCiudades().subscribe(s => {
      this.dataSourcePorFecha = new Array<PropiedadesReporte>()
      for (let index = 0; index < s.length; index++) {
        let item = new PropiedadesReporte();
        item.nombre_ciudad = s[index].nombre;
        
        let count: number = 0
        for (let indexb = 0; indexb < s[index].propiedades.length; indexb++) {
          let proFecha = new Date(s[index].propiedades[indexb].fechaCreacion)
          let alquilada = s[index].propiedades[indexb].alquileres.length
          if (proFecha >= valueFechaDesde && proFecha <= valueFechaHasta && alquilada > 0){
            count += 1
          }
        }
        
        item.cantidad_propiedades = count;
        this.dataSourcePorFecha.push(item)
      }
      console.log(this.dataSource)
    })
  }

}
