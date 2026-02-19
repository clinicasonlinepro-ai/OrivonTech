document.getElementById('form-contato').addEventListener('submit', function(e){
    e.preventDefault();
    const msg = document.getElementById('form-msg');
    msg.textContent = "Mensagem enviada com sucesso! Entraremos em contato.";
    msg.style.color = "green";
    this.reset();
});

document.getElementById('cta').addEventListener('click', function(){
    window.location.href = "#contato";
});