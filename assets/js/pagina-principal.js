//Favoritos *************************************************

var apenasFav = localStorage.mostrarFavs

if ( apenasFav === undefined )
{
    apenasFav = "nao"
    localStorage.mostrarFavs = "nao"
}


function favoritos()
{
    if ( apenasFav === "nao" )
    {
        apenasFav = "sim"
        localStorage.mostrarFavs = "sim"
        localStorage.setItem('mostrarFavs', "sim")
        document.getElementById("btn-favoritos").style.backgroundColor = "#3294EE"
    }
    else if ( apenasFav === "sim" )
    {
        apenasFav = "nao"
        localStorage.mostrarFavs = "nao"
        localStorage.setItem('mostrarFavs', "nao")
        document.getElementById("btn-favoritos").style.backgroundColor = ""
    }

    favApp()
}




//Campo de pesquisa *************************************************

function removerAcentos(str) {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function pesquisa() {
	const input = document.getElementById("barraPesquisa");
	const termosBusca = removerAcentos(input.value.trim().toUpperCase()).split(/\s+/);
	const ul = document.getElementById("aplicativos");
	const artigos = ul.getElementsByTagName("article");

	for (let i = 0; i < artigos.length; i++) {
		const artigo = artigos[i];
		const h2 = artigo.querySelector("h2");
		const tags = artigo.querySelector(".tags");

		const titulo = h2 ? removerAcentos(h2.textContent.trim().toUpperCase()) : "";
		const tagsTexto = tags ? removerAcentos(tags.textContent.trim().toUpperCase()) : "";

		const palavrasTitulo = titulo.split(/\s+/);
		const palavrasTags = tagsTexto.split(/\s+/);

		// Verifica se cada termo digitado aparece no início de alguma palavra do título ou tags
		const corresponde = termosBusca.every(termo =>
			palavrasTitulo.some(p => p.startsWith(termo)) ||
			palavrasTags.some(p => p.startsWith(termo))
		);

		artigo.style.display = (termosBusca[0] === "" || corresponde) ? "" : "none";
	}
}

// Listener de entrada
document.addEventListener('DOMContentLoaded', () => {
	const input = document.getElementById("barraPesquisa");
	input.addEventListener('input', pesquisa);
});


document.addEventListener('DOMContentLoaded', () => {
	const input = document.getElementById("barraPesquisa");

	input.addEventListener('input', () => {
		pesquisa();

		// Se o campo foi limpo, desmarcar qualquer botão ativo
		if (input.value.trim() === "") {
			document.querySelectorAll('#botoes-filtro button.ativo')
				.forEach(btn => btn.classList.remove('ativo'));
		}
	});
});



function limparBarraPesquisa()
{
    document.getElementById("barraPesquisa").value = ""
    pesquisa()

    // Remove destaque de qualquer botão ativo
	document.querySelectorAll('#botoes-filtro button.ativo').forEach(btn => {
		btn.classList.remove('ativo');
	});
}

//Campo de pesquisa *************************************************






//Novo algoritmo dos favoritos (v3)*************************************************

var favoritosArray;

function coletarNomeSims() {
    let titulos = [];
    document.querySelectorAll("article h2").forEach(h2 => {
        titulos.push(h2.innerHTML.trim());
    });
    return titulos;
}

lista = coletarNomeSims();

function articleFavorito(titulo, favorito) {
    document.querySelectorAll("article h2").forEach(h2 => {
        if (h2.innerHTML.trim() === titulo) {
            //troca a cor da tag i mais próxima, caso exista

            if (h2.closest("article").querySelector("i"))
                if (favorito)
                {
                    h2.closest("article").querySelector("i").classList.add("fa-heart");
                    h2.closest("article").querySelector("i").classList.remove("fa-heart-o");
                }
                else
                {
                    h2.closest("article").querySelector("i").classList.remove("fa-heart");
                    h2.closest("article").querySelector("i").classList.add("fa-heart-o");
                }
        }
    });
}



function statusFavoritos()
{
    favoritosArray = listaFavoritos

    //console.log(listaFavoritos)
    for (var key in lista)
    {         
        var simulacao = lista[key];
        if (favoritosArray.includes(simulacao))
        {
            articleFavorito(simulacao, true);
        } else {
            articleFavorito(simulacao, false);
        }
    }
}

setTimeout(statusFavoritos, 200);



function articlePorTitulo(titulo, esconder) {
    document.querySelectorAll("article h2").forEach(h2 => {
        if (h2.innerHTML.trim() === titulo) {
            h2.closest("article").style.display = esconder ? "none" : "block";
        }
    });
}



favApp()
function favApp()
{   
    favoritosArray = listaFavoritos

    cont = 0;

    if ( apenasFav === "nao" )
    {
        var x = document.getElementsByTagName("article");
        var i;
        for (i = 0; i < x.length; i++)
        {
            x[i].style = "display: true";
        }

        document.getElementById("semFavoritos").style.display = "none";
        document.getElementById("coracao").style = "color: #cccccc"
        document.getElementById("btn-favoritos").style.backgroundColor = ""
    }	

    if ( apenasFav === "sim" )
    {
        document.getElementById("coracao").style = "color:rgb(230, 92, 58)"
        document.getElementById("btn-favoritos").style.backgroundColor = "#3294EE"

        //console.log(listaFavoritos)
        for (var key in lista)
        {         
            var simulacao = lista[key];
            //console.log(simulacao)
            if (favoritosArray.includes(simulacao))
            {
                articlePorTitulo(simulacao, false);
                //console.log(key)
                cont++;
            } else {
                articlePorTitulo(simulacao, true);
            }
        }

        if (cont === 0)
        {
            document.getElementById("semFavoritos").style.display = "block";
        }
        else
        {
            document.getElementById("semFavoritos").style.display = "none";
        }
    }
}


//Impede a propagação do clique no favorito *************************************************
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".favorito").forEach(function (element) {
        element.addEventListener("click", function (event) {
            event.stopPropagation(); // Impede a propagação para o link pai
            event.preventDefault(); // Impede a navegação caso a div seja um link
            favoritarSimulacao();
        });
    });
});

async function favoritarSimulacao() {
    const nome_simulacao = event.target.closest("article").querySelector("h2").textContent.trim();

    const url = 'banco-dados/simulacoes/favoritarSimulacao.php';

    const data = new URLSearchParams();
    data.append('favoritar', 'true'); // Envia o campo 'favoritar'
    data.append('nome_simulacao', nome_simulacao);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });

        const result = await response.json();

        if (result.status === 'success')
        {
            //console.log(result.message);
            document.getElementsByClassName('alert')[0].innerHTML = result.message;
            mensagem();

            fetch('./banco-dados/simulacoes/get_user.php')
                .then(response => response.json())
                .then(data => {
                    if (data.success)
                    {
                        listaFavoritos = data.favoritos;
                        
                        favApp();
                        statusFavoritos();
                    } });

            //statusFavoritos();
            //favApp();
            //location.reload();

        } else {
            console.error(result.message);
            alert(result.message); // Exibe uma mensagem de erro para o usuário
        }
    }
    catch (error) {
        console.error('Erro ao favoritar simulação:', error);
        alert('Erro ao favoritar simulação. Tente novamente.'); // Exibe uma mensagem de erro para o usuário
    }
}


//Mensagem de adição de favoritos
function mensagem() {
    const alertMessage = document.getElementsByClassName('alert')[0];

    alertMessage.style.display = 'block';
    alertMessage.classList.remove('hide');

    setTimeout(function() {
        alertMessage.classList.add('hide');

        setTimeout(function() {
            alertMessage.style.display = 'none';
        }, 500); // Tempo correspondente à duração da transição CSS
    }, 3000);
}


//Novo algoritmo dos favoritos *************************************************


//Ordenamento das simulações ***************************************************

let ordemOriginal = [];

window.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('aplicativos');
	ordemOriginal = Array.from(container.children);
});

function filtrarSimuladores()
{
    // Ao mudar o filtro de ordenamento, desativa botões de tema e limpa busca
    document.getElementById('barraPesquisa').value = "";
    document.querySelectorAll('#botoes-filtro button.ativo')
        .forEach(btn => btn.classList.remove('ativo'));

    pesquisa();

    const container = document.getElementById('aplicativos');
    container.classList.remove('modo-grupo');
    container.classList.remove('modo-livre');

	const filtroTexto = document.getElementById('filtroBusca').value.toLowerCase();
	const criterio = document.getElementById('ordenarPor').value;
	let artigos = Array.from(container.getElementsByTagName('article'));

	let simuladores = artigos.map(article => {
		const titulo = article.querySelector('h2').textContent.trim().toLowerCase();
		const tags = article.querySelector('.tags').textContent.toLowerCase();
		return { article, titulo, tags };
	});

	// Filtro por texto
	if (filtroTexto)
    {
		simuladores = simuladores.filter(s =>
			s.titulo.includes(filtroTexto) || s.tags.includes(filtroTexto)
		);
	}

	// Ordenação
	if (criterio === 'alfabetica')
    {
		simuladores.sort((a, b) => a.titulo.localeCompare(b.titulo));
        container.classList.add('modo-livre'); // layout padrão com grid contínuo

        document.getElementById("btn-favoritos").style.backgroundColor = ""
        document.getElementById("coracao").style = "color: #cccccc"
        apenasFav = "nao"
        localStorage.mostrarFavs = "nao"
	} 

    else if (criterio === 'nivel')
    {
        container.classList.add('modo-grupo');

        const grupoBasica = simuladores.filter(s => s.tags.includes('basica') || s.tags.includes('básica'));
        const grupoAvancada = simuladores.filter(s => s.tags.includes('avancada') || s.tags.includes('avançada'));
        const outros = simuladores.filter(s =>
            !grupoBasica.includes(s) && !grupoAvancada.includes(s)
        );

        container.innerHTML = '';

        function renderGrupo(titulo, lista)
        {
            if (lista.length === 0) return;

            // Título fora da grade
            const h3 = document.createElement('h3');
            h3.textContent = titulo;
            container.appendChild(h3);

            // Nova grid para o grupo
            const bloco = document.createElement('div');
            bloco.className = 'tiles'; // mesma classe de layout original
            if (lista.length === 1) bloco.classList.add('solo');
            lista.forEach(s => bloco.appendChild(s.article));
            container.appendChild(bloco);
        }

        renderGrupo('Simulações básicas', grupoBasica);
        renderGrupo('Simulações avançadas', grupoAvancada);
        renderGrupo('Outros', outros);

        if (document.documentElement.lang === 'en') {
            document.querySelector('h3').textContent = 'Basic simulations';
            document.querySelectorAll('h3')[1].textContent = 'Advanced simulations';
            document.querySelectorAll('h3')[2].textContent = 'Others';
        }
        if (document.documentElement.lang === 'es') {
            document.querySelector('h3').textContent = 'Simulaciones básicas';
            document.querySelectorAll('h3')[1].textContent = 'Simulaciones avanzadas';
            document.querySelectorAll('h3')[2].textContent = 'Otros';
        } else if (document.documentElement.lang === 'hi') {
            document.querySelector('h3').textContent = 'मूलभूत सिमुलेशन';
            document.querySelectorAll('h3')[1].textContent = 'उन्नत सिमुलेशन';
            document.querySelectorAll('h3')[2].textContent = 'अन्य';
        } else if (document.documentElement.lang === 'de') {
            document.querySelector('h3').textContent = 'Grundlegende Simulationen';
            document.querySelectorAll('h3')[1].textContent = 'Fortgeschrittene Simulationen';
            document.querySelectorAll('h3')[2].textContent = 'Andere';
        } else if (document.documentElement.lang === 'zh') {
            document.querySelector('h3').textContent = '基础模拟';
            document.querySelectorAll('h3')[1].textContent = '高级模拟';
            document.querySelectorAll('h3')[2].textContent = '其他';
        } else if (document.documentElement.lang === 'ru') {
            document.querySelector('h3').textContent = 'Базовые симуляции';
            document.querySelectorAll('h3')[1].textContent = 'Продвинутые симуляции';
            document.querySelectorAll('h3')[2].textContent = 'Другие';
        } else if (document.documentElement.lang === 'fr') {
            document.querySelector('h3').textContent = 'Simulations de base';
            document.querySelectorAll('h3')[1].textContent = 'Simulations avancées';
            document.querySelectorAll('h3')[2].textContent = 'Autres';
        } else if (document.documentElement.lang === 'ja') {
            document.querySelector('h3').textContent = '基本シミュレーション';
            document.querySelectorAll('h3')[1].textContent = '高度なシミュレーション';
            document.querySelectorAll('h3')[2].textContent = 'その他';
        } else if (document.documentElement.lang === 'ar') {
            document.querySelector('h3').textContent = 'محاكاة أساسية';
            document.querySelectorAll('h3')[1].textContent = 'محاكاة متقدمة';
            document.querySelectorAll('h3')[2].textContent = 'أخرى';
        } else if (document.documentElement.lang === 'id') {
            document.querySelector('h3').textContent = 'Simulasi dasar';
            document.querySelectorAll('h3')[1].textContent = 'Simulasi lanjutan';
            document.querySelectorAll('h3')[2].textContent = 'Lainnya';
        } else if (document.documentElement.lang === 'vi') {
            document.querySelector('h3').textContent = 'Mô phỏng cơ bản';
            document.querySelectorAll('h3')[1].textContent = 'Mô phỏng nâng cao';
            document.querySelectorAll('h3')[2].textContent = 'Khác';
        }

        document.getElementById("btn-favoritos").style.backgroundColor = ""
        document.getElementById("coracao").style = "color: #cccccc"
        apenasFav = "nao"
        localStorage.mostrarFavs = "nao"

        return;
    }

    else if (criterio === 'tema')
    {
        container.classList.add('modo-grupo'); // quando <h3> + várias tiles são usadas

        container.innerHTML = '';

        var temas = {
            'Mecânica': 'mecanica',
            'Termodinâmica': 'termodinamica',
            'Óptica': 'optica',
            'Ondas': 'ondas',
            'Eletromagnetismo': 'eletromagnetismo',
            'Física Moderna': 'moderna',
        };

        if (document.documentElement.lang === 'en') {
            temas = {
            'Mechanics': 'mecanica',
            'Thermodynamics': 'termodinamica',
            'Optics': 'optica',
            'Waves': 'ondas',
            'Electromagnetism': 'eletromagnetismo',
            'Modern Physics': 'moderna',
            };
        } else if (document.documentElement.lang === 'es') {
            temas = {
            'Mecánica': 'mecanica',
            'Termodinámica': 'termodinamica',
            'Óptica': 'optica',
            'Ondas': 'ondas',
            'Electromagnetismo': 'eletromagnetismo',
            'Física Moderna': 'moderna',
            };
        } else if (document.documentElement.lang === 'hi') {
            temas = {
            'यांत्रिकी': 'mecanica',
            'ऊष्मागतिकी': 'termodinamica',
            'प्रकाशिकी': 'optica',
            'तरंगें': 'ondas',
            'वैद्युत चुंबकत्व': 'eletromagnetismo',
            'आधुनिक भौतिकी': 'moderna',
            };
        } else if (document.documentElement.lang === 'de') {
            temas = {
            'Mechanik': 'mecanica',
            'Thermodynamik': 'termodinamica',
            'Optik': 'optica',
            'Wellen': 'ondas',
            'Elektromagnetismus': 'eletromagnetismo',
            'Moderne Physik': 'moderna',
            };
        } else if (document.documentElement.lang === 'zh') {
            temas = {
            '力学': 'mecanica',
            '热力学': 'termodinamica',
            '光学': 'optica',
            '波动': 'ondas',
            '电磁学': 'eletromagnetismo',
            '现代物理学': 'moderna',
            };
        } else if (document.documentElement.lang === 'ru') {
            temas = {
            'Механика': 'mecanica',
            'Термодинамика': 'termodinamica',
            'Оптика': 'optica',
            'Волны': 'ondas',
            'Электромагнетизм': 'eletromagnetismo',
            'Современная физика': 'moderna',
            };
        } else if (document.documentElement.lang === 'fr') {
            temas = {
            'Mécanique': 'mecanica',
            'Thermodynamique': 'termodinamica',
            'Optique': 'optica',
            'Ondes': 'ondas',
            'Électromagnétisme': 'eletromagnetismo',
            'Physique Moderne': 'moderna',
            };
        } else if (document.documentElement.lang === 'ja') {
            temas = {
            '力学': 'mecanica',
            '熱力学': 'termodinamica',
            '光学': 'optica',
            '波動': 'ondas',
            '電磁気学': 'eletromagnetismo',
            '現代物理学': 'moderna',
            };
        } else if (document.documentElement.lang === 'ar') {
            temas = {
            'الميكانيكا': 'mecanica',
            'الديناميكا الحرارية': 'termodinamica',
            'البصريات': 'optica',
            'الأمواج': 'ondas',
            'الكهرومغناطيسية': 'eletromagnetismo',
            'الفيزياء الحديثة': 'moderna',
            };
        } else if (document.documentElement.lang === 'id') {
            temas = {
            'Mekanika': 'mecanica',
            'Termodinamika': 'termodinamica',
            'Optik': 'optica',
            'Gelombang': 'ondas',
            'Elektromagnetisme': 'eletromagnetismo',
            'Fisika Modern': 'moderna',
            };
        } else if (document.documentElement.lang === 'vi') {
            temas = {
            'Cơ học': 'mecanica',
            'Nhiệt động lực học': 'termodinamica',
            'Quang học': 'optica',
            'Sóng': 'ondas',
            'Điện từ học': 'eletromagnetismo',
            'Vật lý hiện đại': 'moderna',
            };
        }

        const grupos = {};
        const outros = [];

        simuladores.forEach(s => {
            const temaTag = (s.tags.match(/tema:([a-zç]+)/) || [])[1]; // extrai a tag tema
            let encontrado = false;

            for (const [nome, slug] of Object.entries(temas))
            {
                if (temaTag === slug)
                {
                    if (!grupos[nome]) grupos[nome] = [];
                    grupos[nome].push(s);
                    encontrado = true;
                    break;
                }
            }

            if (!encontrado) {
                outros.push(s);
            }
        });

        // Renderiza os blocos
        for (const [tema, lista] of Object.entries(grupos))
        {
            const h3 = document.createElement('h3');
            h3.textContent = tema;
            container.appendChild(h3);

            const bloco = document.createElement('div');
            bloco.className = 'tiles';
            if (lista.length === 1) bloco.classList.add('solo');
            lista.forEach(s => bloco.appendChild(s.article));
            container.appendChild(bloco);
        }

        if (outros.length > 0)
        {
            const h3 = document.createElement('h3');
            h3.textContent = 'Tópicos especiais';
            container.appendChild(h3);

            const bloco = document.createElement('div');
            bloco.className = 'tiles';
            if (lista.length === 1) bloco.classList.add('solo');
            outros.forEach(s => bloco.appendChild(s.article));
            container.appendChild(bloco);
        }

        document.getElementById("btn-favoritos").style.backgroundColor = ""
        document.getElementById("coracao").style = "color: #cccccc"
        apenasFav = "nao"
        localStorage.mostrarFavs = "nao"

        return;
    }
		
	else if (criterio === 'padrao')
    {
		// Restaura a ordem original
		container.innerHTML = '';
		ordemOriginal.forEach(el => container.appendChild(el));
		return;
	}

	// Atualiza exibição
	container.innerHTML = '';
	simuladores.forEach(s => container.appendChild(s.article));
}

//Filtro com os botões
function aplicarFiltro(botao)
{
    const input = document.getElementById('barraPesquisa');
    const textoBotao = botao.innerText.trim().toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Se já estava ativo, desativa e limpa a barra
    if (botao.classList.contains('ativo')) {
        botao.classList.remove('ativo');
        input.value = '';
        input.dispatchEvent(new Event('input'));
        return;
    }

    // Define ordenamento para "padrão"
    document.getElementById("ordenarPor").value = "padrao";
    document.getElementById("ordenarPor").dispatchEvent(new Event('change'));

    // Desativa todos os outros botões
    document.querySelectorAll('#botoes-filtro button').forEach(btn => btn.classList.remove('ativo'));

    // Ativa o botão clicado
    botao.classList.add('ativo');

    document.getElementById("btn-favoritos").style.backgroundColor = ""
    document.getElementById("coracao").style = "color: #cccccc"
    apenasFav = "nao"
    localStorage.mostrarFavs = "nao"

    // Aplica o filtro
    input.value = textoBotao;
    input.dispatchEvent(new Event('input'));
}


//********Fim ordenamento simulações***************************** */