document.getElementById('cep').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        consultarCEP();
    }
});

document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const dados = {
        cep: document.getElementById("cep").value,
        rua: document.getElementById("rua").value,
        comp: document.getElementById("comp").value,
        estado: document.getElementById("estado").value,
        cidade: document.getElementById("cidade").value,
        bairro: document.getElementById("bairro").value
    };

    localStorage.setItem("dadosEndereco", JSON.stringify(dados));

    alert("Dados salvos com sucesso!");
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
