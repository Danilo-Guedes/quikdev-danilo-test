import { LinkedinIcon, GithubIcon } from 'lucide-react';

function Footer() {
        
    return (
        <footer>
            <div className="social-icons">
                <a href="https://www.linkedin.com">
                    <LinkedinIcon />
                </a>
                <a href="https://www.github.com">
                    <GithubIcon />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
