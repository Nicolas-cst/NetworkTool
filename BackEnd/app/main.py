from fastapi import FastAPI

app = FastAPI()

@app.get("/data")
def read_data():
    return {"message": "Backend Python fonctionne !"}