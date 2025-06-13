// Team Section - Flip Card Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all team cards
    const teamCards = document.querySelectorAll('.team-card');
    
    // Add click event to flip buttons
    teamCards.forEach(card => {
        const flipBtn = card.querySelector('.flip-btn:not(.back)');
        const flipBackBtn = card.querySelector('.flip-btn.back');
        const cardInner = card.querySelector('.card-inner');
        
        // Front to back flip
        if (flipBtn) {
            flipBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.add('flipped');
                cardInner.style.transform = 'rotateY(180deg)';
            });
        }
        
        // Back to front flip
        if (flipBackBtn) {
            flipBackBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.remove('flipped');
                cardInner.style.transform = 'rotateY(0)';
            });
        }
        
        // Click outside to flip back
        card.addEventListener('click', (e) => {
            if (e.target.closest('.flip-btn')) return;
            
            if (card.classList.contains('flipped')) {
                card.classList.remove('flipped');
                cardInner.style.transform = 'rotateY(0)';
            }
        });
    });
    
    // Initialize tooltips
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
    });
    
    function showTooltip(e) {
        const tooltipText = this.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        tooltip.style.top = `${rect.top - tooltipRect.height - 10}px`;
        tooltip.style.left = `${rect.left + (rect.width - tooltipRect.width) / 2}px`;
        tooltip.classList.add('show');
        
        this.tooltip = tooltip;
    }
    
    function hideTooltip() {
        if (this.tooltip) {
            this.tooltip.remove();
            this.tooltip = null;
        }
    }

    // Auto-scroll for team section
    const teamHorizontalScroll = document.querySelector('.team-horizontal-scroll');
    if (teamHorizontalScroll) {
        let scrollAmount = 0;
        const scrollStep = 1; // Pixels per frame
        const animationFrameDuration = 16; // Approximately 60 frames per second
        let scrollDirection = 1; // 1 for right, -1 for left
        let animationFrameId;
        let lastTimestamp;

        const animateScroll = (timestamp) => {
            if (!lastTimestamp) {
                lastTimestamp = timestamp;
            }
            const elapsed = timestamp - lastTimestamp;

            if (elapsed >= animationFrameDuration) {
                scrollAmount += scrollStep * scrollDirection;
                teamHorizontalScroll.scrollLeft = scrollAmount;

                // Reverse direction if reached end or beginning
                if (scrollAmount >= (teamHorizontalScroll.scrollWidth - teamHorizontalScroll.clientWidth) && scrollDirection === 1) {
                    scrollDirection = -1;
                } else if (scrollAmount <= 0 && scrollDirection === -1) {
                    scrollDirection = 1;
                }
                lastTimestamp = timestamp;
            }
            animationFrameId = requestAnimationFrame(animateScroll);
        };

        const startScrolling = () => {
            stopScrolling(); // Clear any existing animation frame
            lastTimestamp = undefined; // Reset timestamp for smooth start
            animationFrameId = requestAnimationFrame(animateScroll);
        };

        const stopScrolling = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };

        // Start scrolling initially
        startScrolling();

        // Pause scrolling on hover
        teamHorizontalScroll.addEventListener('mouseenter', stopScrolling);
        teamHorizontalScroll.addEventListener('mouseleave', startScrolling);
    }
});
