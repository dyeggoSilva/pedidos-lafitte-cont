
const url = "http://localhost:3000"



const telefoneInput = document.getElementById('telefone');

  telefoneInput.addEventListener('input', function (e) {
    let numero = e.target.value.replace(/\D/g, '').slice(0, 11);

    if (numero.length <= 10) {
      // Formato para fixo: (00) 0000-0000
      e.target.value = numero.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      // Formato para celular: (00) 00000-0000
      e.target.value = numero.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
  });


  document.getElementById("pedidoForm").addEventListener("submit", function (e) {
      e.preventDefault();

       const nome = document.getElementById("nome").value;
       const telefone = document.getElementById("telefone").value;
        const os=document.getElementById("os").value;
        const produtos= document.getElementById("produtos").value;
        const dataPedido= document.getElementById("data_pedido").value;
        const dataPagamento= document.getElementById("data_pagamento").value;
        const vendedor=document.getElementById("vendedor").value;

      const dados = {
        nome: nome,
        telefone: telefone,
        os: os,
        produtos: produtos,
        dataPedido: dataPedido,
        dataPagamento: dataPagamento,
        vendedor: vendedor
      }

      fetch(url+"/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      })
      .then(res => res.json())
      .then(data => {
        alert(data.mensagem);
        document.getElementById("pedidoForm").reset();
      })
      .catch(err => {
        alert("Erro ao enviar pedido");
        console.error(err);
      });
    });

