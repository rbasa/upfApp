window.addEventListener("load", function(){
  document.getElementById('downloadAllButton').addEventListener('click', () => {
    const downloadLinks = document.querySelectorAll('#downloadLink');
    downloadLinks.forEach(link => {
      // Get the file name from the link's download attribute
      const fileName = link.download;
      // Split the file name on the '/' character to get the last element (the actual file name)
      const fileNameParts = fileName.split('/');
      const actualFileName = fileNameParts[fileNameParts.length - 1];
      // Set the link's download attribute to the actual file name
      link.download = actualFileName;
      // Click the link to initiate the download
      link.click();
    });
  });
});
