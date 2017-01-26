
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

