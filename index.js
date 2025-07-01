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

    let listaDeEnderecos = JSON.parse(localStorage.getItem("listaDeEnderecos")) || [];

    listaDeEnderecos.push(dados);

    localStorage.setItem("listaDeEnderecos", JSON.stringify(listaDeEnderecos));

    alert("Endereço salvo com sucesso!");

    document.getElementById("nome").value = '';
    document.getElementById("cep").value = '';
    document.getElementById("rua").value = '';
    document.getElementById("comp").value = '';
    document.getElementById("estado").value = '';
    document.getElementById("cidade").value = '';
    document.getElementById("bairro").value = '';
});

document.getElementById("listar").addEventListener("click", function (e) {
    let listaDeEnderecos = JSON.parse(localStorage.getItem("listaDeEnderecos")) || [];

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    if (listaDeEnderecos.length > 0) {
        listaDeEnderecos.forEach(dados => {
            let item = document.createElement("li");

            item.innerHTML = `
                <strong>Nome:</strong> ${dados.nome}<br>
                <strong>CEP:</strong> ${dados.cep}<br>
                <strong>Rua:</strong> ${dados.rua}<br>
                <strong>Complemento:</strong> ${dados.comp}<br>
                <strong>Estado:</strong> ${dados.estado}<br>
                <strong>Cidade:</strong> ${dados.cidade}<br>
                <strong>Bairro:</strong> ${dados.bairro}
            `;

            lista.appendChild(item);
        });
    } else {
        alert("Nenhum endereço encontrado.");
    }
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
