from fastapi import FastAPI, BackgroundTasks
import time

app = FastAPI(title="Sentinel-AI Automation")

# ይህ AI ስራውን በስተጀርባ እየሰራ እንደሆነ ለማሳየት ነው
def process_automation_task(asset_name: str):
    print(f"Starting AI indexing for {asset_name}...")
    time.sleep(5) # AI ስራውን እየሰራ እንደሆነ ለመምሰል
    print(f"Task Complete: {asset_name} is now searchable.")

@app.get("/")
def read_root():
    return {"status": "Active", "engine": "FastAPI Automation Pipeline"}

@app.post("/trigger-automation")
async def trigger_task(background_tasks: BackgroundTasks, asset_name: str):
    background_tasks.add_task(process_automation_task, asset_name)
    return {"message": "Automation triggered", "asset": asset_name}
