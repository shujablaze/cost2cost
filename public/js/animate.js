const pcPictures = document.querySelectorAll('.pc-picture')

pcPictures.forEach(el=>el.classList.add('hidden-pc'))

const pcOpts = {
    root : null,
    threshold:0.45
}

const pcCallback = (entries)=>{
    entries.forEach(entry=>{
        const elem = entry.target

        if(entry.isIntersecting){
            elem.classList.remove('hidden-pc')
            pcObserver.unobserve(elem)        
        }
    })
}

const pcObserver = new IntersectionObserver(pcCallback,pcOpts)

pcPictures.forEach(el=>pcObserver.observe(el))