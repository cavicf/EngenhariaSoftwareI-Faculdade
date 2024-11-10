from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
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
driver.find_element(By.ID, "nome").send_keys("João Silva")
driver.find_element(By.ID, "cpf").send_keys("123.456.789-00")
driver.find_element(By.ID, "endereco").send_keys("Rua Exemplo, 123, Centro, Cidade, 12345-678")
driver.find_element(By.ID, "telefone").send_keys("(12) 98765-4321")
driver.find_element(By.ID, "observacoes").send_keys("Cliente regular")

# Submeta o formulário
driver.find_element(By.ID, "botao_inserir").click()

# Aguarde a página atualizar
time.sleep(2)  # Ajuste conforme necessário

# Verifique se o cliente aparece na listagem
tabela = driver.find_element(By.ID, "clienteTable")
assert "João Silva" in tabela.text, "Cliente não encontrado na listagem!"

# Feche o navegador
driver.quit()
