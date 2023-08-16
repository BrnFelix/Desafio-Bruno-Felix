class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: { dependeDe: "", valor: 3.0 },
      chantily: { dependeDe: "cafe", valor: 1.5 },
      suco: { dependeDe: "", valor: 6.2 },
      sanduiche: { dependeDe: "", valor: 6.5 },
      queijo: { dependeDe: "sanduiche", valor: 2.0 },
      salgado: { dependeDe: "", valor: 7.25 },
      combo1: { dependeDe: "", valor: 9.5 },
      combo2: { dependeDe: "", valor: 7.5 },
    };

    this.FORMAS_DE_PAGAMENTO = ["debito", "credito", "dinheiro"];
  }

  calcularDescontoDinheiro(valorTotal) {
    const porcentagemDesconto = 0.05;
    const totalFinal = valorTotal - valorTotal * porcentagemDesconto;
    return totalFinal;
  }

  calcularAcrescimoCredito(valorTotal) {
    const porcentagemAcrescimo = 0.03;
    const totalFinal = valorTotal + valorTotal * porcentagemAcrescimo;
    return totalFinal;
  }

  calcularValorDaCompra(metodoDePagamento, carrinhoDeCompras) {
    if (!this.FORMAS_DE_PAGAMENTO.includes(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    if (carrinhoDeCompras.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let total = 0;
    for (const itemInfo of carrinhoDeCompras) {
      const codigoQTD = itemInfo.split(",");
      if (codigoQTD.length != 2){
        return "Item inválido!";
      }

      const codigo = codigoQTD[0];
      const quantidade = codigoQTD[1];

      const item = this.cardapio[codigo]
      if (item === undefined) {
        return "Item inválido!";
      }

      if (item.dependeDe !== "") {
        const itemComDependente = carrinhoDeCompras.find(itemCarrinho => itemCarrinho.includes(item.dependeDe))
        if (itemComDependente === undefined) {
          return "Item extra não pode ser pedido sem o principal"
        }
      }

      const valorItem = item.valor * parseInt(quantidade);

      total += valorItem;
    }

    if (total === 0) {
      return "Quantidade inválida!";
    }

    switch (metodoDePagamento) {
      case "dinheiro":
        total = this.calcularDescontoDinheiro(total);
        break;
      case "credito":
        total = this.calcularAcrescimoCredito(total);
        break;
    }

    return `R$ ${total.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
