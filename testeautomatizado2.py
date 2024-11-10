from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

# Caminho para o ChromeDriver
chrome_driver_path = "C:\\Users\\cavic\\OneDrive\\Documentos\\engenhariadesoftware\\testefelipe\\Papelaria\\chromedriver.exe"  # Verifique se este é o caminho correto!

# Configurações para usar o Chrome com Selenium
options = Options()
# Caso queira rodar sem abrir o navegador, use:
# options.add_argument("--headless")

# Criação do objeto Service
service = Service(executable_path=chrome_driver_path)

# Inicialize o WebDriver usando o ChromeDriver e a Service
driver = webdriver.Chrome(service=service, options=options)

# Abra a página do CRUD
driver.get("http://127.0.0.1:5500/Papelaria/papelaria.html")  # Substitua pelo caminho correto do seu arquivo HTML

# Teste de Inserção de Usuário
driver.find_element(By.ID, "nome").send_keys("João Silva")
driver.find_element(By.ID, "cpf").send_keys("123.456.789-00")
driver.find_element(By.ID, "telefone").send_keys("(12) 98765-4321")
driver.find_element(By.ID, "cargo").send_keys("Funcionário")  # Selecionando "Funcionário"
driver.find_element(By.ID, "observacoes").send_keys("Observações de exemplo")

# Submeta o formulário
driver.find_element(By.XPATH, "//button[text()='Salvar']").click()

# Aguarde a página atualizar
time.sleep(2)  # Ajuste conforme necessário

# Verifique se o usuário aparece na listagem
tabela = driver.find_element(By.ID, "userTable")
assert "João Silva" in tabela.text, "Usuário não encontrado na listagem!"

# Feche o navegador
driver.quit()
