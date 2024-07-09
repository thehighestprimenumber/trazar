const {flatten, uniqBy} = require("lodash");


const mockProducts = {
    carne: ['asado', 'matambre'],
    cerdo: ['solomillo'],
}

const rand = (n = 1) => Math.random() * 100 * n;
const dates = ['2024-01-01', '2024-01-02']

function generate() {
    const output = []
    const cats = Object.keys(mockProducts)
    const productCount = uniqBy(Object.values(mockProducts), 'producto').length;
    for (let i = 0; i <= 3; i++) {
        dates.forEach(d => {
                cats.forEach(cat => {
                        const prods = Object.values(mockProducts[cat]);
                        prods.forEach(p => {
                            const nd = {
                                id: i++,
                                producto: p,
                                departamento: cat,
                                ticketCantidad: Math.floor(rand(1000)),
                                vendidoCant: Math.floor(rand(1000)),
                                precio: Math.floor(rand(100)),
                                fecha: new Date(d),
                                sucursal: Math.floor(rand(3))
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
