const maravilhosasBox = document.querySelector('.maravilhosas__box');


//fetch('https://theblackwomanhistory.firebaseio.com/.json') //<- API da internet
fetch('http://localhost:5001/maravilhosas') //API NO SERVIDOR LOCAL
    .then(response => {
        return response.json();
    })
    .then(data => {
        data.content.forEach(conteudo => {
            const perfil = document.createElement('div');
            perfil.setAttribute('class', 'maravilhosas__perfil');

            const ancoraPerfil = document.createElement('a');
            ancoraPerfil.setAttribute('href', '#');

            const imagemPerfil = document.createElement('img');
            imagemPerfil.setAttribute('class', 'img-responsive');
            imagemPerfil.setAttribute('alt', 'Foto da Personalidade')
            // if (conteudo.metadata) {
            //     if (conteudo.metadata.image) {
            //         if (conteudo.metadata.image.url) {
            //             imagemPerfil.src = conteudo.metadata.image.url;
            //         }
            //     }
            //     else {
            //         imagemPerfil.src = 'img/img-mulher.png';
            //     }
            // } else {
            //     imagemPerfil.src = 'img/img-mulher.png';
            // }
            //Solução da Lory (refatoração)
            if (conteudo.metadata == undefined || conteudo.metadata.image == "" || conteudo.metadata.image.url == "") {
                imagemPerfil.src = 'img/img-mulher.png'
            }
            else {
                imagemPerfil.setAttribute('src', conteudo.metadata.image.url);
            }
            const namePerfil = document.createElement('p');
            namePerfil.textContent = conteudo.title;

            ancoraPerfil.appendChild(imagemPerfil);
            perfil.appendChild(ancoraPerfil);
            perfil.appendChild(namePerfil);

            maravilhosasBox.appendChild(perfil);
        })
    })
    .catch(erro => {
        console.log(erro)
    })

function cadastrarPerfil() {
    const botao = document.querySelector('#submit')
    botao.addEventListener("click", evento => {
        evento.preventDefault();

        const nome = document.querySelector('[name="nome"]').value
        const endImagem = document.querySelector('[name="imagem"').value

        console.log(nome, endImagem);

        fetch('http://localhost:5001/maravilhosas', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'title': nome,
                'metadata': {
                    'image': {
                        'url': endImagem
                    }
                }
            })
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .then(erro => {
                console.log(erro);
            })

        window.location.reload();
    }
    )
}