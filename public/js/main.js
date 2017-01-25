
var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function(){
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	inicializaMarcador();
	//Quando carregar a pagina, atrela o evento ao botão.
	$("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase(){
	var frase = $(".frase").text();
	var numPalavras = frase.split(" ");
	var tamanhoFrase = numPalavras.length;
	$("#tamanho-frase").text(tamanhoFrase);
}

function inicializaContadores(){
	campo.on("input", function(){
		var conteudo = campo.val();
	   
	    var qtdPalavras = conteudo.split(/\s+/).length -1; 
	    $("#contador-palavras").text(qtdPalavras);

	    var qtdCaracteres = conteudo.length;
	    $("#contador-caracteres").text(qtdCaracteres);
	});
}

function inicializaCronometro(){
	var tempoRestante = $("#tempo-digitacao").text();
	campo.one("focus", function(){
	    var cronometroId = setInterval(function(){
	      tempoRestante--;
	      $("#tempo-digitacao").text(tempoRestante);
	      if(tempoRestante < 1 ){
	      		clearInterval(cronometroId);
	        	finalizaJogo();
	      }
	    },1000);
	});
}

function finalizaJogo(){
	campo.attr("disabled",true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcador(){
	var frase = $(".frase").text();
	campo.on("input", function(){
		var digitado = campo.val();
		var comparavel = frase.substr(0 , digitado.length);
	    if(digitado == comparavel){
	       campo.addClass("borda-verde");
	       campo.removeClass("borda-vermelha");
	    }else{
	       campo.addClass("borda-vermelha");
	       campo.removeClass("borda-verde");
	    }
	})
}

function inserePlacar(){
	var corpoTabela = $(".placar").find("tbody");
    var usuario = "Junior";
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    //procura dentro do elemento...
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.prepend(linha);
}

function novaLinha(usuario, numPalavras){
	var linha = $("<tr>");
	var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(numPalavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href","#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
    
    link.append(icone);

    colunaRemover.append(link); 

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);
   
    return linha;

}
$(".botao-remover").click(removeLinha);

function removeLinha(){

		//event.preventDefault();
	    $(this).parent().parent().remove();	
};

function reiniciaJogo(){
	campo.attr("disabled", false);
	campo.val("");
	$("#contador-palavras").text("0");
	$("#contador-caracteres").text("0");
	$("#tempo-digitacao").text(tempoInicial);
	inicializaCronometro();
	campo.toggleClass("campo-desativado");
	campo.removeClass("borda-vermelha");
	campo.removeClass("borda-verde");
}

