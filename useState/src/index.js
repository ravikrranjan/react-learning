
let componentHooks =[];
let currentHookIndex = 0;

window['__componentHooks']= componentHooks;
window['__currentHookIndex'] = currentHookIndex;
function useState(initialState) {


    let pair = componentHooks[currentHookIndex];
    if(pair) {
        // This is not the first render,
        // so the state pair already exists.
        // Return it and prepare for next Hook call.
        currentHookIndex++;
        return pair
    }

    // This is the first time time We're rendering,
    // so create a state pair and store it.

    pair = [initialState, setState];

    function setState(nextState) {
        // When the user requests a state change,
        // put the new value into the pair.
        pair[0] = nextState;
        updateDOM();
    }


    componentHooks[currentHookIndex] = pair;
    currentHookIndex++;
    return pair;
}

function Gallery() {

    const [index, setIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);
    console.log(index, setIndex);

    function handleNextClick() {
        setIndex(index + 1);
    }

    function handleMoreClick() {
        setShowMore(!showMore);
    }

    window['__setIndex'] = setIndex
    let sculpture = sculptureList[index];

    return {
        onNextClick : handleNextClick,
        onMoreClick: handleMoreClick,
        header: `${sculpture.name} by ${sculpture.artist}`,
        counter: `${index + 1} of ${sculptureList.length}`,
        more : `${showMore ? 'Hide' : 'Show'} details`,
        description: showMore ? sculpture.description : null,
        imageSrc : sculpture.url,
        imageAlt : sculpture.alt
    }
}

function updateDOM() {

    // Reset the current Hook index
    // before rendering the component

    currentHookIndex = 0;
console.log('currentHookIndex', currentHookIndex);
    let output = Gallery();

    nextButton.onclick = output.onNextClick;
    header.textContent = output.header;
    moreButton.onclick = output.onMoreClick;
    moreButton.textContent = output.more;
    image.src = output.imageSrc;
    image.alt = output.imageAlt;

    if(output.description) {
        description.textContent = output.description;
        description.style.display = '';
    } else {
        description.style.display = 'none'
    }



}
let nextButton = document.getElementById('nextButton');
let header = document.getElementById('header');
let moreButton = document.getElementById('moreButton');
let description= document.getElementById("description");
let image = document.getElementById('image');



// console.log(nextButton, header, moreButton, description, image, );

let sculptureList = [{
    name: 'Homenaje a la Neurocirugía',
    artist: 'Marta Colvin Andrade',
    description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
    url: 'https://i.imgur.com/Mx7dA2Y.jpg',
    alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'
},
{
    name: 'Cavaliere',
    artist: 'Lamidi Olonade Fakeye',
    description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
    url: 'https://i.imgur.com/wIdGuZwm.png',
    alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.'
  }, {
    name: 'Big Bellies',
    artist: 'Alina Szapocznikow',
    description: "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
    url: 'https://i.imgur.com/AlHTAdDm.jpg',
    alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.'
  }, {
    name: 'Terracotta Army',
    artist: 'Unknown Artist',
    description: 'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
    url: 'https://i.imgur.com/HMFmH6m.jpg',
    alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.'
  }, {
    name: 'Lunar Landscape',
    artist: 'Louise Nevelson',
    description: 'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
    url: 'https://i.imgur.com/rN7hY6om.jpg',
    alt: 'A black matte sculpture where the individual elements are initially indistinguishable.'
  }, {
    name: 'Aureole',
    artist: 'Ranjani Shettar',
    description: 'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
    url: 'https://i.imgur.com/okTpbHhm.jpg',
    alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.'
  }, {
    name: 'Hippos',
    artist: 'Taipei Zoo',
    description: 'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
    url: 'https://i.imgur.com/6o5Vuyu.jpg',
    alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.'
  }
]

// Make UI match the intial state
updateDOM();