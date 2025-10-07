const calc = (req, res) => (async () => {
    const {num1, num2, operacao} = req.body;
    let resultado = 0;

    switch(operacao) {
        case '+':
            resultado = num1 + num2;
            break;
        case '-':
            resultado = num1 - num2;
            break;
        case '*':
            resultado = num1 * num2;
            break;
        case '/':
            if (num2 !== 0) {
                resultado = num1 / num2;
            } else {
                return res.json({ status: "error", "mensagem": "Divisão por zero não é permitida."});
            }
            break;
        default:
            return res.json({ status: "error", "mensagem": "Operação inválida."});
    }

    res.json({ status: "ok", "resultado": resultado });
})();

module.exports = {
    calc,
}