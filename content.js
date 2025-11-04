console.log("Email Writer Extension - Content Script Loaded");

const API_BASE_URL = 'https://smart-email-writer-sb-production.up.railway.app';

function createAIButton() {
   const button = document.createElement('div');
   button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
   button.style.cssText = `
       margin-right: 8px;
       background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%);
       color: white;
       border-radius: 6px;
       padding: 8px 14px;
       cursor: pointer;
       font-size: 12px;
       font-weight: 600;
       box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3);
       transition: all 0.2s ease;
       border: none;
       position: relative;
       overflow: hidden;
   `;
   button.innerHTML = '✨ AI Reply';
   button.setAttribute('role','button');
   button.setAttribute('data-tooltip','Generate AI Reply with Gemini AI');
   
   // Add hover effects
   button.addEventListener('mouseenter', () => {
       button.style.transform = 'translateY(-1px)';
       button.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.4)';
   });
   
   button.addEventListener('mouseleave', () => {
       button.style.transform = 'translateY(0)';
       button.style.boxShadow = '0 2px 8px rgba(79, 70, 229, 0.3)';
   });
   return button;
}

function getEmailContent() {
    const selectors = [
        '.h7',
        '.a3s.aiL',
        '.ii.gt .a3s.aiL',
        '[role="listitem"] .a3s.aiL',
        '.gmail_quote',
        '.adP.adO'
    ];
    
    let content = '';
    for (const selector of selectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            const lastElement = elements[elements.length - 1];
            content = lastElement.innerText.trim();
            if (content && content.length > 10) {
                content = content.split('On ')[0];
                content = content.split('From:')[0];
                content = content.substring(0, 1000);
                break;
            }
        }
    }
    
    return content || 'Please provide more context for the email reply.';
}

function findComposeToolbar() {
    const selectors = [
        '.btC',
        '.aDh',
        '[role="toolbar"]',
        '.gU.Up',
        '.Am.Al.editable'
    ];
    
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar && toolbar.offsetParent !== null) {
            return toolbar;
        }
    }
    return null;
}

function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar) {
        console.log("Toolbar not found");
        return;
    }

    console.log("Toolbar found, creating AI button");
    const button = createAIButton();
    button.classList.add('ai-reply-button');

    button.addEventListener('click', async () => {
        try {
            button.innerHTML = '⏳ Generating...';
            button.disabled = true;

            const emailContent = getEmailContent();
            console.log("Email content:", emailContent.substring(0, 100) + "...");

            const response = await fetch(`${API_BASE_URL}/api/email/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: "professional"
                })
            });

            if (!response.ok) {
                throw new Error(`API Request Failed: ${response.status}`);
            }

            const generatedReply = await response.text();
            
            const composeSelectors = [
                '[role="textbox"][g_editable="true"]',
                '.Am.Al.editable [role="textbox"]',
                '.editable[role="textbox"]',
                'div[contenteditable="true"]'
            ];
            
            let composeBox = null;
            for (const selector of composeSelectors) {
                composeBox = document.querySelector(selector);
                if (composeBox && composeBox.offsetParent !== null) break;
            }

            if (composeBox) {
                composeBox.focus();
                composeBox.innerHTML = generatedReply;
                
                const event = new Event('input', { bubbles: true });
                composeBox.dispatchEvent(event);
                
                console.log("Reply inserted successfully");
            } else {
                console.error('Compose box not found');
                alert('Could not find compose area. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Failed to generate reply: ${error.message}`);
        } finally {
            button.innerHTML = '✨ AI Reply';
            button.disabled = false;
        }
    });

    toolbar.insertBefore(button, toolbar.firstChild);
}

const observer = new MutationObserver((mutations) => {
    for(const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE && 
            (node.matches('.aDh, .btC, [role="dialog"], .nH.if, .nH.hx') || 
             node.querySelector('.aDh, .btC, [role="dialog"], .nH.if, .nH.hx'))
        );

        if (hasComposeElements) {
            console.log("Compose Window Detected");
            setTimeout(injectButton, 1000);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

setTimeout(injectButton, 2000);