const {flatten, uniqBy} = require("lodash");


const mockProducts = {
    carne: ['asado', 'matambre', 'picada', 'milanesa'],
    cerdo: ['solomillo', 'bondiola'],
    pollo: ['entero', 'patamuslo', 'milanesa', 'pechuga']
}

const rand = (n = 1) => Math.floor(Math.random() * n);
const dates = ['2024-07-03', '2024-07-04', '2024-07-05', '2024-07-06', '2024-07-07', '2024-07-08', '2024-07-09'];

function generate() {
    const output = []
    const cats = Object.keys(mockProducts)
    const productCount = uniqBy(Object.values(mockProducts), 'producto').length;
    for (let i = 0; i <= 3; i++) {
        dates.forEach(d => {
                cats.forEach(cat => {
                        const prods = Object.values(mockProducts[cat]);
                        prods.forEach(p => {
                            const vendidoCant = Math.floor(rand(100));
                            const nd = {
                                id: i++,
                                producto: p,
                                departamento: cat,
                                ticketCantidad: (rand(vendidoCant)),
                                vendidoCant: vendidoCant,
                                precio: (rand(5000)),
                                fecha: new Date(d),
                                sucursal: (rand(3))+1
                            }

                            output.push(nd)
                        })

                    }
                )
            }
        )
    }
    return output

}

const output = dates.map(generate)

console.log(JSON.stringify(flatten(output)))
