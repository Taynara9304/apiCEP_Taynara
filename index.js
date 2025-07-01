document.getElementById('cep').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        consultarCEP();
    }
});

document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const cep = document.getElementById("cep").value.trim();
    const rua = document.getElementById("rua").value.trim();
    const comp = document.getElementById("comp").value.trim();
    const estado = document.getElementById("estado").value.trim();
    const cidade = document.getElementById("cidade").value.trim();
    const bairro = document.getElementById("bairro").value.trim();

    if (!nome || !cep || !rua || !comp || !estado || !cidade || !bairro) {
        alert("Preencha todos os campos antes de salvar.");
        return;
    }

    const dados = {
        nome,
        cep,
        rua,
        comp,
        estado,
        cidade,
        bairro
    };

    localStorage.setItem("dadosEndereco", JSON.stringify(dados));

    alert("Dados salvos com sucesso!");
});

document.getElementById("listar").addEventListener("click", function (e) {    let item = document.createElement("p");
    var texto = document.createTextNode("Novo item");
    let dados = localStorage.getItem("dadosEndereco");

    dados.forEach(dado => {
        let dados = document.getElementById("lista").innerHTML()
        const item = dados.parseJSON(dados);
    });
    item.appendChild(texto);

    var lista = document.getElementById("lista");
    lista.appendChild(item);

});


function consultarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');

    if (cep.length !== 8) {
        alert("CEP inválido. Por favor, digite um CEP válido.");
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado.');
                limparCamposEndereco();
            } else {
                document.getElementById('rua').value = data.logradouro || '';
                document.getElementById('bairro').value = data.bairro || '';
                document.getElementById('cidade').value = data.localidade || '';
                document.getElementById('estado').value = data.uf || ''; //modifiquei aqui
            }
        })
        .catch(error => {
            alert('Ocorreu um erro ao consultar o CEP.');
            console.error(error);
            limparCamposEndereco();
        });
}

function limparCamposEndereco() {
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}
