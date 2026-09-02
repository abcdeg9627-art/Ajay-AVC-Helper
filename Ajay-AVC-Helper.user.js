// ==UserScript==
// @name         Ajay AVC Helper
// @namespace    https://github.com/
// @version      1.0.0
// @description  Copy all HindiGeetMala song page links to clipboard for use with Any Video Converter.
// @author       Ajay Barot
// @match        *://hindigeetmala.net/movie/*
// @match        *://www.hindigeetmala.net/movie/*
// @grant        none
// @license      MIT
// @homepageURL  https://github.com/
// @supportURL   https://github.com/
// ==/UserScript==

(function () {
    'use strict';

    /*
     * Ajay AVC Helper
     * Version 1.0.0
     *
     * Project Idea : Ajay Barot
     * Development  : ChatGPT
     *
     * Purpose:
     * To save time, simplify work,
     * and promote responsible use of technology.
     *
     * Dedicated to everyone who believes
     * technology should save people's time—not waste it.
     */


    // --------------------------------------------------
    // Prevent duplicate button
    // --------------------------------------------------

    if (document.getElementById('ajay-avc-helper-button')) {
        return;
    }


    // --------------------------------------------------
    // Find all song links
    // --------------------------------------------------

    function getSongLinks() {

        const links = [];
        const seen = new Set();

        document.querySelectorAll('a[href]').forEach(function (link) {

            let href = link.href;

            if (!href) {
                return;
            }

            // Only HindiGeetMala song pages
            if (!href.includes('/song/')) {
                return;
            }

            // Remove URL fragments
            href = href.split('#')[0];

            // Remove trailing slash
            if (href.endsWith('/')) {
                href = href.slice(0, -1);
            }

            // Remove duplicate links
            if (!seen.has(href)) {

                seen.add(href);
                links.push(href);

            }

        });

        return links;
    }


    // --------------------------------------------------
    // Create helper button
    // --------------------------------------------------

    const button = document.createElement('button');

    button.id = 'ajay-avc-helper-button';

    button.textContent = '📋 Copy Song Links';


    // --------------------------------------------------
    // Button appearance
    // --------------------------------------------------

    button.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 2147483647;

        padding: 13px 19px;

        background: #d60000;
        color: #ffffff;

        border: none;
        border-radius: 8px;

        font-family: Arial, sans-serif;
        font-size: 16px;
        font-weight: bold;

        cursor: pointer;

        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.30);

        transition: transform 0.15s ease,
                    background 0.15s ease;
    `;


    // --------------------------------------------------
    // Hover effect
    // --------------------------------------------------

    button.addEventListener('mouseenter', function () {

        button.style.background = '#a80000';
        button.style.transform = 'scale(1.04)';

    });


    button.addEventListener('mouseleave', function () {

        button.style.background = '#d60000';
        button.style.transform = 'scale(1)';

    });


    // --------------------------------------------------
    // Add button to page
    // --------------------------------------------------

    document.body.appendChild(button);


    // --------------------------------------------------
    // Copy links to clipboard
    // --------------------------------------------------

    button.addEventListener('click', async function () {

        const songs = getSongLinks();


        // No songs found
        if (songs.length === 0) {

            alert(
                'No song links were found on this page.\n\n' +
                'Please make sure you are on a HindiGeetMala movie page.'
            );

            return;
        }


        const text = songs.join('\n');


        try {

            await navigator.clipboard.writeText(text);

            button.textContent =
                '✓ ' + songs.length + ' Links Copied';

            button.style.background = '#168a16';


            alert(
                '✓ ' +
                songs.length +
                ' song links copied to Clipboard.\n\n' +
                'You can now use them with Any Video Converter.'
            );


            // Restore button
            setTimeout(function () {

                button.textContent =
                    '📋 Copy Song Links';

                button.style.background =
                    '#d60000';

            }, 3000);


        } catch (error) {

            console.error(
                'Ajay AVC Helper clipboard error:',
                error
            );


            // --------------------------------------------------
            // Clipboard fallback
            // --------------------------------------------------

            const textarea =
                document.createElement('textarea');

            textarea.value = text;

            textarea.style.position = 'fixed';
            textarea.style.left = '-999999px';

            document.body.appendChild(textarea);

            textarea.focus();
            textarea.select();


            try {

                const copied =
                    document.execCommand('copy');


                if (copied) {

                    button.textContent =
                        '✓ ' +
                        songs.length +
                        ' Links Copied';

                    button.style.background =
                        '#168a16';


                    alert(
                        '✓ ' +
                        songs.length +
                        ' song links copied to Clipboard.'
                    );


                    setTimeout(function () {

                        button.textContent =
                            '📋 Copy Song Links';

                        button.style.background =
                            '#d60000';

                    }, 3000);


                } else {

                    throw new Error(
                        'Clipboard copy failed.'
                    );

                }

            } catch (fallbackError) {

                console.error(
                    'Ajay AVC Helper fallback error:',
                    fallbackError
                );


                alert(
                    'Unable to copy the song links.\n\n' +
                    'Please try again.'
                );

            }


            document.body.removeChild(textarea);

        }

    });

})();
