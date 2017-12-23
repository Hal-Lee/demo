<h1 id="-java-web-">Linux搭建 Java Web 开发环境</h1>
<p>此教程教大家如何配置 JDK 、Tomcat 和 Mysql</p>
<p>前提：Linux环境、64位系统、JDK7 64位、tomcat7、mysql在线安装;</p>
<h2 id="-jdk">安装 JDK</h2>
<p>小插曲（查看一下系统信息）</p>
<pre><code>uname -a
cat /proc/version
</code></pre>
![](https://i.imgur.com/4bOVgMP.png)
<p>JDK 是开发Java程序必须安装的软件，我们查看一下 <code>yum</code> 源里面的 JDK：</p>
<pre><code>yum list java*</code></pre>
![](https://i.imgur.com/59j1AIK.png)
<p> 选择适合本机的JDK，并安装： </p>
<pre><code>yum install java-1.7.0-openjdk* -y</code></pre>
![](https://i.imgur.com/Bb14G0c.png)
<p>安装完成后，查看是否安装成功：</p>
<pre><code>java -version</code></pre>
![](https://i.imgur.com/5g8NoIM.png)
<p>查看jdk信息：</p>
<pre><code>rpm -qa|grep java</code></pre>
![](https://i.imgur.com/at5eEdz.png)
<p>如果需要卸载：</p>
<pre><code>yum remove java java*</code></pre>
![](https://i.imgur.com/Ht1PerI.png)
<p>输入y开始卸载</p>
<p>配置环境变量（使用yum安装完之后，默认的安装目录是在: /usr/lib/jvm/java-1.7.0-openjdk-1.7.0.161-2.6.12.0.el7_4.x86_64）：</p>
<p>或使用which java定位安装路径（which java定位到的是java程序的执行路径）</p>
<pre><code>which java
ls -lrt /usr/bin/java
ls -lrt /etc/alternatives/java
</code></pre>
![](https://i.imgur.com/MPRonXv.png)
<p>设置环境变量：</p>
<pre><code>vi /etc/profile</code></pre>
<p>在profile文件中添加如下内容：</p>
<pre><code># set java environment
export JAVA_HOME=/usr/lib/jvm/java-1.7.0-openjdk-1.7.0.161-2.6.12.0.el7_4.x86_64
export JAVA_BIN=$JAVA_HOME/bin
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$PATH
</code></pre>
<p>刷新配置：</p>
<pre><code>source /etc/profile</code></pre>


<h2 id="-tomcat">安装 Tomcat</h2>
<p>进入本地文件夹</p>
<pre><code>cd /root</code></pre>
<p>到官网找到 Tomcat 的下载链接，并下载到服务器中：</p>
<pre><code>wget https://mc.qcloudimg.com/static/archive/fa66329388f85c08e8d6c12ceb8b2ca3/apache-tomcat-7.0.77.tar.gz</code></pre>
![](https://i.imgur.com/MXi9sfq.png)
<p>解压文件：</p>
<pre><code>tar -xzvf apache-tomcat-7.0.77.tar.gz</code></pre>
<p>进入 bin 文件夹</p>
<pre><code>cd apache-tomcat-7.0.77/bin
</code></pre><p>给startup.sh、shutdown.sh、catalina.sh授予权限：</p>
<pre><code>chmod 777 startup.sh shutdown.sh catalina.sh</code></pre>
<p>开启tomcat服务：</p>
<pre><code>./startup.sh</code></pre>
<p>访问 Tomcat</p>
<p><a target="_blank" href="http://&lt;您的 CVM IP 地址&gt;:8080" title="null">http://&lt;您的 CVM IP 地址&gt;:8080</a> 可访问到刚才启动的 Tomcat 的内置示例页面 </p>
<p>如果访问不了，有可能是器防火墙问题，8080端口被拦截了，于是需要打开8080端口，并保存重启防火墙：</p>
<pre><code>iptables -I INPUT -p tcp --dport 8080 -j ACCEPT
/etc/init.d/iptables save
/etc/init.d/iptables restart
</code></pre>
<p>停止tomcat服务：</p>
<pre><code>./shutdown.sh</code></pre>
<h5>配置tomcat启动、关闭、重启脚本：</h5>
<p>新建服务脚本：</p>
<pre><code>vim /etc/init.d/tomcat</code></pre>
<p>添加服务内容：</p>
<pre><code># description: Tomcat7 Start Stop Restart
CATALINA_HOME=/usr/local/tomcat/apache-tomcat-7.0.77

case $1 in
        start)
                sh $CATALINA_HOME/bin/startup.sh
                ;;
        stop)
                sh $CATALINA_HOME/bin/shutdown.sh
                ;;
        restart)
                sh $CATALINA_HOME/bin/shutdown.sh
                sh $CATALINA_HOME/bin/startup.sh
                ;;
        *)
                echo 'please use : tomcat {start | stop | restart}'
        ;;
esac
exit 0
</code></pre>
<p>:wq 保存脚本</p>
<pre><code>启动：service tomcat start
停止：service tomcat stop
重启：service tomcat restart
</code></pre>


<h2>安装 MySQL</h2>
<p>检查系统是否安装有MySQL,有的话则卸载：</p>
<pre><code>yum list  installed|grep mysql</code></pre>
![](https://i.imgur.com/XgumkDU.png)
<p>卸载：</p>
<pre><code>yum remove mysql*</code></pre>
<p>安装MySQL：</p>
<pre><code>yum install -y mysql-server mysql mysql-devel</code></pre>
<p>安装完成之后，启动MySQL服务：</p>
<pre><code>service mysqld start</code></pre>
![](https://i.imgur.com/wkLLdPf.png)
<p>启动成功并检查安装的软件：</p>
<pre><code>yum list installed|grep mysql</code></pre>
![](https://i.imgur.com/riOwxAG.png)
<p>为mysql设置root密码：</p>
<pre>/usr/bin/mysqladmin -u root password 'pwd1234'</pre>
<p>查看mysqld是否开机自启动，并设置为开机自启动：</p>
<pre><code>chkconfig --list | grep mysqld
chkconfig mysqld on
</code></pre>
![](https://i.imgur.com/9K46Ngy.png)
<p>修改字符集为UTF-8：</p>
<pre><code>vim /etc/my.cnf</code></pre>
<p>在[mysqld]中添加：</p>
<pre>character-set-server=utf8</pre>
<pre>在文件末尾新增[client]，并在[client]后添加：
default-character-set=utf8
</pre>
![](https://i.imgur.com/cpoa4AF.png)
<p>重启MySQL服务器：</p>
<pre>service mysqld restart</pre>
![](https://i.imgur.com/haIky8F.png)
<p>登录mysql:</p>
<pre>mysql -hlocalhost -uroot -ppwd1234
(mysql -h主机地址 -u用户名 -p用户密码)</pre>
![](https://i.imgur.com/vWpR0k7.png)
<p>查看编码：</p>
<pre>show variables like "%character%";</pre>
![](https://i.imgur.com/RlJztFp.png)
<p>配置远程连接，并刷新配置和查看用户：</p>
<pre>GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'pwd1234' WITH GRANT OPTION;
flush privileges;
SELECT DISTINCT CONCAT(</span>'User: ''',user,'''@''',host,''';') AS query FROM mysql.user;</pre>
![](https://i.imgur.com/se8l8hK.png)
<p>使用Navicat远程连接数据库：</p>
![](https://i.imgur.com/JhxHIr1.png)
<h3>Bye</h3>