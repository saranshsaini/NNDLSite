# Standard library
import random
import sys
import pickle

# Third-party libraries
import numpy as np


class Network(object):
    def __init__(
        self, sizes
    ):  # the list sizes contains the number of neurons in the respective layers.
        self.num_layers = len(sizes)  # the number of the layers in Network
        self.sizes = sizes
        self.biases = [np.random.randn(y, 1) for y in sizes[1:]]
        self.weights = [np.random.randn(y, x) for x, y in zip(sizes[:-1], sizes[1:])]

    def feedforward(self, a):
        """Return the output of the network if "a" is input"""
        for b, w in zip(self.biases, self.weights):
            a = sigmoid(np.dot(w, a) + b)
        return a

    def evaluate(self, test_data):
        """Return the number of test inputs for which the neural
        network outputs the correct result. Note that the neural
        network's output is assumed to be the index of whichever
        neuron in the final layer has the highest activation."""
        test_results = [(np.argmax(self.feedforward(x)), y) for (x, y) in test_data]
        return sum(int(x == y) for (x, y) in test_results)

    def cost_derivative(self, output_activations, y):
        """Return the vector of partial derivatives \partial C_x /
        \partial a for the output activations."""
        return output_activations - y

    def save_net(self):
        with open("weights.txt", "w") as f:
            for item in self.weights:
                f.write("%s" % item)
        with open("biases.txt", "w") as f:
            for item in self.biases:
                f.write("%s" % item)


#### Miscellaneous functions
def sigmoid(z):
    """The sigmoid function."""
    return 1.0 / (1.0 + np.exp(-z))


def sigmoid_prime(z):
    """Derivative of the sigmoid function."""
    return sigmoid(z) * (1 - sigmoid(z))


def load_net():
    net = Network([784, 30, 10])
    net.weights = pickle.load( open( "weightspickle.obj", "rb" ) )
    net.biases = pickle.load( open( "biasespickle.obj", "rb" ) )
    return net
    # training_data, validation_data, test_data = mnist_loader.load_data_wrapper()
    # print(net.evaluate(test_data))



net = load_net()
testdata = pickle.load( open( "testfile.obj", "rb" ) )
numcorrect = net.evaluate(testdata)
print(numcorrect)


sys.stdout.flush()

