# Ente Alla - The Photo Browser Appliaction

This is a simple application that enables users to upload folders, files, and view the images within them in a seamless manner. For showing 1000s of images on the ui, we are using the [Virutoso Masonry](https://virtuoso.dev/hello-masonry/), which actually enabled the application to render the images in a more performant way rather than adding all the images to the DOM simultaneously, and for fetching the images from the local device, we have used the showDirectoryPicker API.

And now the obvious part: this currently working prototype has been built mostly with AI, maybe 80%, and the rest by 20%. That's the only reason I am writing this right now, and the code can be improved more, maybe with another few hours of work. the three main things which this app was built were all new to me, though I used virtualization a while back. This package was new and I haven't done masonry before, as well as haven't played with the showDirectoryAPI.

and finally, here is it [https://ente-alla.vercel.app/](https://ente-alla.vercel.app/)

p.s. upon my current load test the app works like a charm till the 12000 mark photos, beyond that the call stack fails, and solution would be ig to add a pagination if the photos for a single folder is more than say some 5000, and we can put that too in the page header so its accessible to the user.
