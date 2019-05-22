const maravilhosasBox = document.querySelector('.maravilhosas__box');

const maravilhosasPerfil = document.createElement('div');
maravilhosasPerfil.setAttribute('class', 'img-responsive');

fetch('https://theblackwomanhistory.firebaseio.com/.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        data.content.forEach(conteudo => {
            console.log(conteudo)
            const perfil = document.createElement('div');
            perfil.setAttribute('class', 'maravilhosas__perfil')
            const imagemPerfil = document.createElement('img');
            imagemPerfil.setAttribute('class', 'img-responsive');
            if (conteudo.metadata) {
                if (conteudo.metadata.image) {
                    if (conteudo.metadata.image.url) {
                        imagemPerfil.src = conteudo.metadata.image.url;
                    }
                }
                else {
                    imagemPerfil.src = 'img/img-mulher.png'
                }
            } else {
                imagemPerfil.src = 'img/img-mulher.png'
            }

            const namePerfil = document.createElement('p');
            namePerfil.textContent = conteudo.title;

            perfil.appendChild(imagemPerfil);
            perfil.appendChild(namePerfil);

            maravilhosasBox.appendChild(perfil);

        })
    })
    .catch(erro => {
        console.log(erro)
    })