from matplotlib import pyplot as plt
from matplotlib import animation
import numpy as np
# import Adafruit_DHT
# from gpiozero import LED
import time
import random

#   Note:
#       Since i don't have the raspberry pi on hand, i can't really test the data from the sensor
#       so i'm just using dummy data as a placeholder 

# sensor = Adafruit_DHT.DHT11
# pin = 20
# led_blue = LED(5)
# led_red = LED(6)

fig = plt.figure()
ax = plt.axes(xlim=(0,30),ylim=(15,45))
line, = ax.plot(np.arange(30),np.ones(30,dtype=float)*np.nan,lw=1,c='blue',marker='d',ms=2)

# h,t = Adafruit_DHT.read_retry(sensor,pin)

def init():
    return line

def animate(i):
    # h,t = Adafruit_DHT.read_retry(sensor,pin)
    #TODO:Replace with actual value
    t = random.randrange(15,45)
    # if t <= 25:
    #     led_blue.on()
    #     led_red.off()
    # else:
    #     led_blue.off()
    #     led_red.on()
    print(f"frame # {i} - Temperature = {t}")
    y = t
    old_y = line.get_ydata()
    new_y = np.r_[old_y[1:],y]
    line.set_ydata(new_y)
    return line,

anim = animation.FuncAnimation(fig,animate,init_func=init,frames=30,interval=200,blit=False)
plt.show()
anim.save(f"animation_{int(time.time())}.gif",writer="pillow")

# led_blue.off()
# led_red.off()

plt.savefig(f"animation_{int(time.time())}.png")


