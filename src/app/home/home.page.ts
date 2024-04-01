import { Component } from '@angular/core';
import { Database, object, ref, set} from '@angular/fire/database';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  luzCocina: any = {};
  luzComedor: any = {};
  luzSala: any = {};
  luzSotano: any = {};
  luzDormitorio: any = {};
  luzOficina: any = {};

  colorCocina: string = 'gray';
  colorComedor: string = 'gray';
  colorDormitorio: string = 'gray';
  colorOficina: string = 'gray';
  colorSala: string = 'gray';
  colorSotano: string = 'gray';


  constructor(private database: Database) { }


  ngOnInit() {
    const cocina = ref(this.database, "/casa/cocina");
    object(cocina).subscribe(attributes => {
      const cocinaValor = attributes.snapshot.val();
      this.luzCocina = cocinaValor;

      if (cocinaValor === true) {
        this.colorCocina = 'yellow';
      } else {
        this.colorCocina = 'gray';
      }

      


      
    });

    const comedor = ref(this.database, "/casa/comedor");
    object(comedor).subscribe(attributes => {
      const comedorValor = attributes.snapshot.val();
      this.luzComedor = comedorValor;

      if (comedorValor === true) {
        this.colorComedor = 'yellow';
      } else {
        this.colorComedor = 'gray';
      }

    });

    const dormitorio = ref(this.database, "/casa/dormitorio");
    object(dormitorio).subscribe(attributes => {
      const dormitorioValor = attributes.snapshot.val();
      this.luzDormitorio = dormitorioValor;

      if (dormitorioValor === true) {
        this.colorDormitorio= 'yellow';
      } else {
        this.colorDormitorio = 'gray';
      }

    });

    const oficina = ref(this.database, "/casa/oficina");
    object(oficina).subscribe(attributes => {
      const oficinaValor = attributes.snapshot.val();
      this.luzOficina = oficinaValor;

      if (oficinaValor === true) {
        this.colorOficina = 'yellow';
      } else {
        this.colorOficina = 'gray';
      }

    });

    const sala = ref(this.database, "/casa/sala");
    object(sala).subscribe(attributes => {
      const salaValor = attributes.snapshot.val();
      this.luzSala = salaValor;

      if (salaValor === true) {
        this.colorSala = 'yellow';
      } else {
        this.colorSala = 'gray';
      }

    });

    const sotano = ref(this.database, "/casa/sotano");
    object(sotano).subscribe(attributes => {
      const sotanoValor = attributes.snapshot.val();
      this.luzSotano = sotanoValor;

      if (sotanoValor === true) {
        this.colorSotano = 'yellow';
      } else {
        this.colorSotano = 'gray';
      }
    });

  }



  Estado(location: string) {
    const locationRef = ref(this.database, `/casa/${location}`);
    object(locationRef).pipe(
      take(1) // Tomar solo el primer valor emitido y luego completar la suscripción
    ).subscribe(attributes => {
      const currentValue = attributes.snapshot.val();
      set(locationRef, !currentValue).then(() => {
        // Actualizar el estado local sin suscribirse nuevamente a los cambios
        this.updateLocalState(location, !currentValue);
      });
    });
  }

  private subscribeToData(location: string, luzProperty: string, colorProperty: string) {
    const locationRef = ref(this.database, location);
    object(locationRef).pipe(
      take(1) // Tomar solo el primer valor emitido y luego completar la suscripción
    ).subscribe(attributes => {
      const luzValor = attributes.snapshot.val();
      [luzProperty] = luzValor;
      [colorProperty] = luzValor === true ? 'yellow' : 'gray';
    });
  }

  private updateLocalState(location: string, value: boolean) {
    switch (location) {
      case 'cocina':
        this.luzCocina = value;
        this.colorCocina = value ? 'yellow' : 'gray';
        break;
      case 'comedor':
        this.luzComedor = value;
        this.colorComedor = value ? 'yellow' : 'gray';
        break;
      case 'dormitorio':
        this.luzDormitorio = value;
        this.colorDormitorio = value ? 'yellow' : 'gray';
        break;
      case 'oficina':
        this.luzOficina = value;
        this.colorOficina = value ? 'yellow' : 'gray';
        break;
      case 'sala':
        this.luzSala = value;
        this.colorSala = value ? 'yellow' : 'gray';
        break;
      case 'sotano':
        this.luzSotano = value;
        this.colorSotano = value ? 'yellow' : 'gray';
        break;
      default:
        break;
    }
  }
}

  

