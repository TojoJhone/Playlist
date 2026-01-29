    
        const AwsIndStreamDomain = 'https://vekna402las.com/';
        let currentImdbId = '';

        function initializePlayer(imdbId) {
            currentImdbId = imdbId;
            
            const IndStreamPlayerConfigs = {
                width: '100%',
                height: '100%',
                id: 'IndStreamPlayer',
                src: imdbId,
                tr: false
            };

            const AwsIndStreamIframeParamTr = IndStreamPlayerConfigs.tr !== false && IndStreamPlayerConfigs.tr > 0 ? '?tr=' + parseInt(IndStreamPlayerConfigs.tr) : '';
            const AwsIndStreamPlayerIframe = document.createElement('iframe');
            const AwsIndStreamIframeUrl = `${AwsIndStreamDomain}/play/${IndStreamPlayerConfigs.src}${AwsIndStreamIframeParamTr}`;
            let initIndStreamPlayer = false;

            const genAwsPlayer = () => {
                AwsIndStreamPlayerIframe.setAttribute('src', AwsIndStreamIframeUrl);
                AwsIndStreamPlayerIframe.setAttribute('width', '1');
                AwsIndStreamPlayerIframe.setAttribute('height', '1');
                AwsIndStreamPlayerIframe.setAttribute('frameborder', '0');
                AwsIndStreamPlayerIframe.setAttribute('allowfullscreen', 'allowfullscreen');
                
                const AwsIndStreamPlayerContainer = document.getElementById(IndStreamPlayerConfigs.id);
                
                if (AwsIndStreamPlayerContainer != null) {
                    // Clear existing content
                    AwsIndStreamPlayerContainer.innerHTML = '';
                    AwsIndStreamPlayerContainer.appendChild(AwsIndStreamPlayerIframe);
                } else {
                    setTimeout(genAwsPlayer, 100);
                }
            };

            function listener(event) {
                if ('origin' in event) {
                    if (event.origin == AwsIndStreamDomain && !initIndStreamPlayer) {
                        if ('event' in event.data) {
                            if (event.data.event == 'init') {
                                AwsIndStreamPlayerIframe.width = '100%';
                                AwsIndStreamPlayerIframe.height = '100%';
                                initIndStreamPlayer = true;
                            } else if (event.data.event == 'error') {
                                alert('Error loading video. Please check the IMDB ID.');
                            }
                        }
                    }
                }
            }

            if (window.addEventListener) {
                window.addEventListener("message", listener);
            } else {
                window.attachEvent("onmessage", listener);
            }

            genAwsPlayer();
        }

        // Submit button click handler
        document.getElementById('submitBtn').addEventListener('click', function() {
            const imdbId = document.getElementById('imdbInput').value.trim();
            if (imdbId) {
                // Hide input section and show player section
                document.querySelector('.input-section').style.display = 'none';
                document.querySelector('.player-section').classList.add('active');
                initializePlayer(imdbId);
            } else {
                alert('Please enter a valid IMDB ID');
            }
        });

        // Enter key handler
        document.getElementById('imdbInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const imdbId = document.getElementById('imdbInput').value.trim();
                if (imdbId) {
                    // Hide input section and show player section
                    document.querySelector('.input-section').style.display = 'none';
                    document.querySelector('.player-section').classList.add('active');
                    initializePlayer(imdbId);
                } else {
                    alert('Please enter a valid IMDB ID');
                }
            }
        });
    
