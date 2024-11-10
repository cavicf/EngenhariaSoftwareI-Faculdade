from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Caminho para o ChromeDriver
chrome_driver_path = "C:/Users/cavic/OneDrive/Documentos/engenhariadesoftware/PAPELARIA/chromedriver.exe"  # Verifique se este é o caminho correto!

# Configurações para usar o Chrome com Selenium
options = Options()
# Caso queira rodar sem abrir o navegador, use:
# options.add_argument("--headless")

# Criação do objeto Service
service = Service(executable_path=chrome_driver_path)

# Inicialize o WebDriver usando o ChromeDriver e a Service
driver = webdriver.Chrome(service=service, options=options)

# Abra a página do CRUD
driver.get("http://127.0.0.1:5500/papelaria.html")  # URL do seu CRUD

# Teste de Inserção de Cliente
# Preencher dados do cliente
driver.find_element(By.ID, "nome").send_keys("João Silva")
driver.find_element(By.ID, "cpf").send_keys("123.456.789-00")
driver.find_element(By.ID, "endereco").send_keys("Rua Exemplo, 123, Centro, Cidade, 12345-678")
driver.find_element(By.ID, "telefone").send_keys("(12) 98765-4321")
driver.find_element(By.ID, "observacoes").send_keys("Cliente regular")

# Submeter o formulário de cliente
driver.find_element(By.ID, "botao_inserir").click()

# Verifique se o cliente aparece na listagem
tabela_cliente = driver.find_element(By.ID, "clienteTable")
assert "João Silva" in tabela_cliente.text, "Cliente não encontrado na listagem!"

# Teste de Inserção de Usuário
# Preencher dados do usuário
driver.find_element(By.ID, "usuario_nome").send_keys("Maria Oliveira")
driver.find_element(By.ID, "usuario_cpf").send_keys("987.654.321-00")
driver.find_element(By.ID, "usuario_telefone").send_keys("(21) 99999-8888")
driver.find_element(By.ID, "usuario_cargo").send_keys("Funcionário")
driver.find_element(By.ID, "usuario_observacoes").send_keys("Usuário registrado com sucesso")

# Submeter o formulário de usuário
driver.find_element(By.ID, "botao_inserir_usuario").click()

# Aguarde a página atualizar e a tabela aparecer (espera explícita)
try:
    # Espera até que o usuário seja visível na tabela
    WebDriverWait(driver, 10).until(
        EC.text_to_be_present_in_element((By.ID, "userTable"), "Maria Oliveira")
    )
    # Verifique se o usuário aparece na listagem
    tabela_usuario = driver.find_element(By.ID, "userTable")
    assert "Maria Oliveira" in tabela_usuario.text, "Usuário não encontrado na listagem!"
except Exception as e:
    print(f"Erro ao inserir usuário: {e}")
time.sleep(10)
# Feche o navegador
driver.quit()
