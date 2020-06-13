import React, {Component} from 'react';
//Component to display the video container for videos.
export default class Video extends Component {
    state = {
        blobUrl: '',
    };
    
    handleRightClick = e => {
        e.preventDefault ();
    };
    /*
    Securing the video url file is done here using blob urls instead of traditional urls.
    The video file in the gcp bucket is read into a {binary large object} using XMLHttp request
    and then converted to a data URL. The right click functionality is disabled as well so
    users won't be able to download from the UI. An event handler to check if focus has shifted
    from the current tab is used to ensure that the user will not be able to access the blob outside
    the current session. 
    */
    handleBlobConversion = () => {
            var xhr = new XMLHttpRequest ();
            xhr.responseType = 'blob';
            const proxy = 'https://cors-anywhere.herokuapp.com/';

            xhr.onload = () => {
            var reader = new FileReader ();

            reader.onloadend = () => {
                var byteCharacters = atob (
                reader.result.slice (reader.result.indexOf (',') + 1)
                );

                var byteNumbers = new Array (byteCharacters.length);

                for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt (i);
                }
                var byteArray = new Uint8Array (byteNumbers);
                var blob = new Blob ([byteArray], {type: 'video/ogg'});
                var url = URL.createObjectURL (blob);
                document.addEventListener ('visibilitychange', () => {
                URL.revokeObjectURL (url);
                });
                if(document.getElementById('_video')){
                    document.getElementById('_video').src = url
                };
            };
            reader.readAsDataURL (xhr.response);
            };

            xhr.open ('GET', proxy + this.props.topicitem.video_url);
            xhr.setRequestHeader ('Access-Control-Allow-Origin', '*');
            xhr.withCredentials = false;
            xhr.send ();
    };
  render () {
    this.handleBlobConversion ();
    return (
      <div className="video-container">
        <video
          id="_video"
          preload="auto"
          class="responsive-video vertical-center"
          onContextMenu={this.handleRightClick}
          width="100%"
          controls
        >
          <source src={this.state.blobUrl} type="video/mp4" />
        </video>
      </div>
    );
  }
}
