<h1>Neural Networks From Scratch in Python, For the Web</h1>

<p>I recently began reading through Neural Networks and Deep Learning by Michael Nielsen (http://neuralnetworksanddeeplearning.com/).

The value of this book comes from the ground up approach it takes in teaching about Neural Networks and Deep Learning— no TensorFlow or Keras or PyTorch. Of course, this means the book focuses a lot more on math and it takes a lot more time to start getting into code, but the end result is worth it.

But I also wanted to take it further, and do something with the Neural Net.
I wanted to do something with the program that the book guided me through. The purpose of the net was to identify handwritten digits, so I decided to make a website where I could test out the classification system.

To do this, I made the backend with Node and Express. When the user writes something and hits submit, the request is sent, and the backend takes care of spawning a child process to run the python script. The pre-trained models are stored in .npy files and are used to classify the user's number.

Right now the main hiccup comes from transforming the HTML canvas the user writes on into a array of pixel values that is the proper size and format for the Python code to handle. There is room for improvement here, and I aim on improving that part.

 </p>

<h6>This project is a work in progress</h6>
