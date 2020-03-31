import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  productos: Producto [] = [];
  cargando = true;
  productosFiltrados: Producto [] = [];


  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise((resolve, reject) => {

      this.http.get('https://angular-html-8ca6d.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
    });


  }

  getProducto(id: string) {

    return this.http.get(`https://angular-html-8ca6d.firebaseio.com/productos/${ id }.json`);

  }

  buscarProducto( termino: string ) {


    if (this.productos.length === 0) {
      this.cargarProductos().then( () => {

        this.filtrarProductos(termino);

      });
    } else {

      this.filtrarProductos( termino );

    }



  }

  private filtrarProductos( termino: string) {

    termino = termino.toLowerCase();

    this.productosFiltrados = [];
    this.productos.forEach( prod => {
      if (prod.categoria.toLowerCase().indexOf(termino) >= 0 || prod.titulo.toLowerCase().indexOf(termino) >= 0) {
        this.productosFiltrados.push(prod);
      }
    });

  }
}
