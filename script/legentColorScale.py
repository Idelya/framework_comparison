import re
import matplotlib.pyplot as plt
import numpy as np

columns = [1, 2, 3, 4, 5]
colormap = plt.get_cmap('RdYlBu')
colormap_start, colormap_end = 0.2, 0.83
minimum = 1
maximum = -1


def create_color_scale():
    # Create a figure and a colorbar
    fig, ax = plt.subplots(figsize=(6, 1))
    fig.subplots_adjust(bottom=0.5)

    # Create a gradient from colormap_start to colormap_end
    gradient = np.linspace(colormap_start, colormap_end, 256)[::-1]
    gradient = np.vstack((gradient, gradient))
    print(gradient)

    # Display the gradient
    ax.imshow(gradient, aspect='auto', cmap=colormap, vmin=0, vmax=1)
    # ax.set_axis_off()

    # Create a colorbar
    #cbar = fig.colorbar(ax.imshow(gradient, aspect='auto', cmap=colormap), ax=ax, orientation='horizontal')
    ax.set_yticks([])
    ax.set_xticks([0, 128, 256])
    ax.set_xticklabels([-1, 0, 1])
    
    # Save the figure
    plt.savefig('color_scale.png')
    plt.show()

create_color_scale()
