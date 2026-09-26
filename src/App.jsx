import { useState, useEffect } from "react"
import { db } from "./data/db";
import Header from "./components/Header"
import Guitar from "./components/Guitar"





function App() {
  //Logica y CSS

  //const [auth, setAuth] = useState(false);
  const [data, setData] = useState(db);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([])

  //Calcula total
  useEffect(() => {
    let newTotal = 0;

    cart.forEach((guitar) => {
      newTotal += guitar.price * guitar.quantity;
    });

    setTotal(newTotal);
  }, [cart]);



  function handlerClick(item) {
    setCart((prevCart) => {
      const guitarExist = prevCart.find((guitar) => guitar.id === item.id);

      if (guitarExist) {
        if (guitarExist.quantity >= 5) return prevCart;

        return prevCart.map((guitar) =>
          guitar.id === item.id
            ? { ...guitar, quantity: guitar.quantity + 1 }
            : guitar
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  }

  function vaciarCarrito() {
    setCart([]);
  }

  function eliminarProducto(item) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== item.id));
  }

  function actualizarCantidad(item, cambio) {
    setCart((prevCart) =>
      prevCart
        .map((guitar) =>
          guitar.id === item.id
            ? { ...guitar, quantity: guitar.quantity + cambio }
            : guitar
        )
        .filter((guitar) => guitar.quantity > 0 && guitar.quantity <= 5)
    );
  }




  /*

data.map(() => {
  console.log("Guitarra encontrada")

})


  /*ERROR
  if(auth){
   const [ref,setRef] = useState([]);
  }
  */
  //UseEffect
  /*
  useEffect(() => {
  //accion al cargar el componente
  console.log("Componente listo");
  
  },[])
  
  //Accion al cargar el componente
  useEffect(() => {
  
  console.log("Token cambio ");
  
  },[auth])
  
  setTimeout(()=>[
    setAuth(true),
    setTotal(100)
   
  ],3000)
  
  */

  return (
    //Estructura
    <>
      <Header
        cart={cart}
        total={total}
        vaciarCarrito={vaciarCarrito}
        eliminarProducto={eliminarProducto}
        actualizarCantidad={actualizarCantidad}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => (


            <Guitar
              key={guitar.id}
              guitar={guitar}
              handlerClick={handlerClick}

            />
          )
          )}

        </div>
      </main>





      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App
