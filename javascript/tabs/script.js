const tabs = document.getElementById('tabs');
const tabContent = document.getElementById('tab-content-container');
const defaultActiveTabBtn = document.querySelector('[data-tab="tab-1"]');

//on page load, make the first tab active by default, and set up the show more button functionality.
function makeFirstTabActive() {
  defaultActiveTabBtn.classList.add('active-btn');
  setUpShowMoreFor('tab-1')
}

makeFirstTabActive();

tabs.addEventListener('click', function (e) {
  if (!e.target.dataset.tab) return; //restrict clicks outside the tabs.

  const clickedTab = e.target;
  const clickedTabId = clickedTab.dataset.tab;

  const tabContents = tabContent.querySelectorAll('.tab-content');

  // switch tab content
  tabContents.forEach((tabContent) => {
    if (tabContent.id === clickedTabId) {
      tabContent.classList.remove('hidden');
    } else {
      tabContent.classList.add('hidden');
    }
  });

  setUpShowMoreFor(clickedTabId);

  // update active button class
  const tabBtns = tabs.querySelectorAll('[data-tab]');
  tabBtns.forEach((tabBtn) => tabBtn.classList.remove('active-btn'));
  clickedTab.classList.add('active-btn');
});

function setUpShowMoreFor(tabId) {
  const content = document.querySelector(`#${tabId} .tab-text`); //tab-text of which div?? div with tabId.
  const fullText = content.textContent.trim();
  const words = fullText.split(/\s+/);

  if (words.length > 20 && !content.dataset.processed) {
    const truncated = words.slice(0, 20).join(' ') + '...';

    // Create span for text and span for button
    const textSpan = document.createElement('span');
    textSpan.textContent = truncated;

    const btn = document.createElement('span');
    btn.textContent = ' Show More';
    btn.classList.add('show-more-less-btn');

    content.textContent = ''; // Clear original content
    content.appendChild(textSpan);
    content.appendChild(btn);
    content.dataset.processed = 'true';//so that it is not processed again.

    let isExpanded = false;

    btn.addEventListener('click', function () {
      if (isExpanded) {
        textSpan.textContent = truncated;
        btn.textContent = ' Show More';
      } else {
        textSpan.textContent = fullText;
        btn.textContent = ' Show Less';
      }
      isExpanded = !isExpanded;
    });
  }
}
