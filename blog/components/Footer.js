import '../static/style/components/footer.css'

const Footer = ()=>{
    return (
        <div className="footer-div">
            <div>系统是由React+egg.js+Ant Design</div>
            <div>
                <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030902002401" rel="noopener noreferrer" target="_blank" class="alink s-fc3 police-link">
                    <span class="police-logo"></span>
                    <span class="police-text">粤ICP备2020114175号 粤公网安备44030902002401号</span>
                </a>
            </div>
        </div>
    )
}

export default Footer