import pandas as pd

# Charger le fichier Excel
df = pd.read_excel('Lexique383.xlsx')  # ou préciser la feuille : sheet_name='NomFeuille'

# Convertir en JSON
df.to_json('Lexique383.json', orient='records', force_ascii=False, indent=4)
