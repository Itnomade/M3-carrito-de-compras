
let productosCarro = [];

if(localStorage.getItem("productos")) {
    productosCarro = JSON.parse(localStorage.getItem("productos"))
    console.log(productosCarro)
    actualizarCarro(productosCarro); 
}


function actualizarCarro(listadoProductos){
    localStorage.setItem("productos", JSON.stringify(listadoProductos));

    const valorInicial = 0;
    const sumaProductos = listadoProductos.reduce(
       (acumulador, producto) => acumulador + producto.cantidad, 
       valorInicial

    );

    document.querySelector("#cantidad-productos").innerText = sumaProductos;
} 

cargarTablaProdutos();

function cargarTablaProdutos() {

    let precioTotalCompra = 0; 
    let acumuladorFilas = "";

    productosCarro.forEach((producto, index) => {

        let productoConDetalles = encontrarProducto(producto.sku); 
        console.log(productoConDetalles)
        let precioUnitario = productoConDetalles.precio - productoConDetalles.descuento; 
        let totalProducto = producto.cantidad * precioUnitario;
        //ARMANDO TABLA
        let template = `
            <tr>
                <th scope="row">${index+1}</th>
                <td>${productoConDetalles.sku}</td>
                <td>${productoConDetalles.nombre}</td>
                <td>${productoConDetalles.precio}</td>
                <td>${productoConDetalles.descuento}</td>
                <td>${precioUnitario}</td>
                <td>${producto.cantidad}</td>
                <td>${totalProducto}</td>
            </tr>
        
        `;
     acumuladorFilas += template; 
    
    });

    document.querySelector("#productos-carrito tbody").innerHTML = acumuladorFilas;

}

function encontrarProducto(sku){
    console.log(sku)
    let encontrado = productos.find(producto => producto.sku == sku)
    return encontrado; 
}