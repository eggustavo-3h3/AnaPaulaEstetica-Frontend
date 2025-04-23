document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário para validar primeiro

    // Obtendo os valores dos campos
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('error-message');

    // Validando se as senhas são iguais
    if (password !== confirmPassword) {
        errorMessage.textContent = "As senhas não coincidem. Tente novamente.";
    } else {
        errorMessage.textContent = "";  // Limpa a mensagem de erro se as senhas forem iguais
        alert('Cadastro realizado com sucesso!');  // Simula o sucesso do cadastro
        // Aqui você pode enviar os dados para o servidor ou fazer outra ação
    }
});
