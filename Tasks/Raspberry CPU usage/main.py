import time
import psutil
import datetime
# from gpiozero import LED

logEvery = 5 #Seconds
lastLog = 0

# ledGreen = LED(16)
# ledYellow = LED(20)
# ledRed = LED(21)
while(True):
    usage = psutil.cpu_percent(interval=1)
    #Log the usage every X seconds (5 seconds by default)
    if((time.monotonic() - lastLog) >= logEvery):
        lastLog = time.monotonic()
        f = open("log.txt", "a")
        t = datetime.datetime.now()
        f.write(f"[{t.__str__()}] CPU USAGE(%) : {usage}\n")
        f.close()
    
    #Light the Led's
    # if(usage < 50):
    #     ledGreen.on()
    #     ledYellow.off()
    #     ledRed.off()
    # elif(usage < 80):
    #     ledGreen.off()
    #     ledYellow.on()
    #     ledRed.off()
    # elif(usage >= 80):
        # ledGreen.off()
        # ledYellow.off()
        # ledRed.on()