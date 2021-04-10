function Slider(slider) {
  // error out if an actual slider Element isn't used
  if (!(slider instanceof Element)) {
    throw new Error('No slider passed in');
  }

  // slider variables
  let current;
  let prev;
  let next;

  // select the elements neede for the slider to work
  const slides = slider.querySelector('.slides');
  const prevBtn = slider.querySelector('.goToPrev');
  const nextBtn = slider.querySelector('.goToNext');

  // initiate the slider
  function startSlider() {
    // find the slide with the class of "current", otherwise use the first slide
    current = slider.querySelector('.current') || slides.firstElementChild;
    // find the previous slide before the one with the "current" class, otherwise use the last slide
    prev = current.previousElementSibling || slides.lastElementChild;
    // find the next slide after the one with the "current" class, otherwise use the first slide
    next = current.nextElementSibling || slides.firstElementChild;
  }

  // apply classes to slides
  function applyClasses() {
    current.classList.add('current');
    prev.classList.add('prev');
    next.classList.add('next');
  }

  // move the slides by adding/removing classes
  function move(direction) {
    // make an array of classes that we can loop through
    const classesToRemove = ['prev', 'current', 'next'];
    
    // strip classes off the current slides by iterating through the array of elements and removing all the classes in the array
    prev.classList.remove(...classesToRemove); // the "(...classesToRemove)" tells the function to remove any classes that match those that are in the array
    current.classList.remove(...classesToRemove); // essentially this line is doing this: current.classList.remove('prev', 'current', 'next');
    next.classList.remove(...classesToRemove); // same with this
    
    // determine direction and reapply classes
    if(direction === 'back') {
      // shifts classes back 1 slide by making a new array and destructuring the values into the 'prev', 'current', and 'next' variables
      [prev, current, next] = [
        // get the previous slide or the last slide from the entire slider to make it wrap
        prev.previousElementSibling || slides.lastElementChild, 
        prev, 
        current
      ];
    } else {
      // shifts classes forward 1 slide by making a new array and destructuring the values into the 'prev', 'current', and 'next' variables
      [prev, current, next] = [
        current, 
        next, 
        // get the next slide or the first slide from the entire slider to make it wrap
        next.nextElementSibling || slides.firstElementChild
      ];
    }
    // adds the classes to the slides if the directiosn were changed
    applyClasses();
  }

  // run the start the slider function & add classes
  startSlider();
  applyClasses();

  // add click events for the Previous and Next buttons
  prevBtn.addEventListener('click', () => move('back'));
  nextBtn.addEventListener('click', move); // our move function if statement only checks for 'back', so we can just call the function here instead of writing an inline function like the line above
};

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));
